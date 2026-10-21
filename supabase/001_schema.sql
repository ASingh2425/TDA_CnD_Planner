-- Run once in a new Supabase project. All shared writes pass through authorized RPCs.
create table public.profiles(id uuid primary key references auth.users on delete cascade, display_name text not null check(length(display_name) between 1 and 80));
create table public.roles(user_id uuid primary key references public.profiles on delete cascade, role text not null check(role in ('member','reviewer','maintainer','admin')));
create function public.has_role(allowed text[]) returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.roles where user_id=auth.uid() and role=any(allowed)) $$;
create table public.initiatives(id text primary key, title text not null, description text not null, status text not null default 'Proposed' check(status in ('Proposed','Planned','In Progress','In Review','Released')),lead uuid references public.profiles, specification jsonb not null,version integer not null default 0);
create table public.milestones(id text primary key,initiative_id text not null references public.initiatives,text text not null);
create table public.tasks(id text primary key,title text not null check(length(title) between 3 and 160),description text not null,initiative_id text not null references public.initiatives,track text not null,difficulty text not null check(difficulty in ('Beginner','Intermediate','Advanced')),skills text[] not null,prerequisites text not null,instructions text[] not null,criteria text[] not null,deliverable text not null,effort integer not null check(effort between 1 and 500),resources jsonb not null default '[]',repository_url text not null check(repository_url ~ '^https://'),status text not null default 'Available' check(status in ('Available','Assigned','In Progress','Submitted for Review','Changes Requested','Approved','Blocked')),archived boolean not null default false,version integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.task_prerequisites(task_id text references public.tasks,required_task_id text references public.tasks,primary key(task_id,required_task_id),check(task_id<>required_task_id));
create table public.assignments(task_id text primary key references public.tasks,member_id uuid not null references public.profiles,reviewer_id uuid references public.profiles,blocker text,check(member_id<>reviewer_id));
create table public.submissions(id bigint generated always as identity primary key,task_id text not null references public.tasks,member_id uuid not null references public.profiles,url text not null check(url ~ '^https://[^[:space:]]+$'),notes text not null,created_at timestamptz not null default now());
create table public.reviews(id bigint generated always as identity primary key,submission_id bigint not null references public.submissions,reviewer_id uuid not null references public.profiles,decision text not null check(decision in ('Approved','Changes Requested')),feedback text not null check(length(feedback) between 3 and 5000),created_at timestamptz not null default now());
create table public.audit_events(id bigint generated always as identity primary key,actor uuid references public.profiles,task_id text references public.tasks,event text not null,created_at timestamptz not null default now());
create table public.problem_completions(user_id uuid references public.profiles,problem_id text not null,submission_url text not null check(submission_url ~ '^https://[^[:space:]]+$'),created_at timestamptz not null default now(),primary key(user_id,problem_id));
create index assignments_member on public.assignments(member_id);create index assignments_reviewer on public.assignments(reviewer_id);create index submissions_task on public.submissions(task_id);create index tasks_status on public.tasks(status);create index reviews_submission on public.reviews(submission_id);
create function public.can_read_task(t text) returns boolean language sql stable security definer set search_path='' as $$ select public.has_role(array['maintainer','admin']) or exists(select 1 from public.assignments where task_id=t and auth.uid() in(member_id,reviewer_id)) $$;
do $$ declare t text; begin foreach t in array array['profiles','roles','initiatives','milestones','tasks','task_prerequisites','assignments','submissions','reviews','audit_events','problem_completions'] loop execute format('alter table public.%I enable row level security',t);execute format('revoke all on public.%I from anon, authenticated',t);execute format('grant select on public.%I to authenticated',t);end loop;end $$;
grant select on public.initiatives,public.milestones,public.tasks,public.task_prerequisites to anon;
create policy public_initiatives on public.initiatives for select using(true);
create policy public_milestones on public.milestones for select using(true);
create policy public_tasks on public.tasks for select using(not archived or public.has_role(array['maintainer','admin']));
create policy public_prerequisites on public.task_prerequisites for select using(true);
create policy profile_read on public.profiles for select using(id=auth.uid() or public.has_role(array['maintainer','admin']));
create policy role_read on public.roles for select using(user_id=auth.uid() or public.has_role(array['admin']));
create policy assignment_read on public.assignments for select using(public.can_read_task(task_id));
create policy submission_read on public.submissions for select using(public.can_read_task(task_id));
create policy review_read on public.reviews for select using(exists(select 1 from public.submissions s where s.id=submission_id and public.can_read_task(s.task_id)));
create policy audit_read on public.audit_events for select using(public.can_read_task(task_id));
create policy completion_read on public.problem_completions for select using(user_id=auth.uid());
create function public.save_profile(p_name text) returns void language plpgsql security definer set search_path='' as $$ begin if auth.uid() is null then raise exception 'Sign in required';end if;insert into public.profiles values(auth.uid(),trim(p_name)) on conflict(id) do update set display_name=excluded.display_name;insert into public.roles values(auth.uid(),'member') on conflict do nothing;end $$;
create function public.task_action(p_task text,p_version integer,p_action text,p_value text default '',p_member uuid default null,p_reviewer uuid default null) returns void language plpgsql security definer set search_path='' as $$
declare t public.tasks; a public.assignments; sid bigint; elevated boolean;
begin
 if auth.uid() is null then raise exception 'Sign in required';end if;
 select * into t from public.tasks where id=p_task for update;
 if not found or t.archived then raise exception 'Task unavailable';end if;
 if t.version<>p_version then raise exception 'Task changed. Refresh and try again.';end if;
 select * into a from public.assignments where task_id=p_task;
 elevated:=public.has_role(array['maintainer','admin']);
 if p_action='claim' then
  if t.status<>'Available' then raise exception 'Task is already assigned';end if;
  if exists(select 1 from public.task_prerequisites pr where pr.task_id=p_task and not exists(select 1 from public.assignments aa join public.tasks tt on tt.id=aa.task_id where aa.member_id=auth.uid() and tt.id=pr.required_task_id and tt.status='Approved')) then raise exception 'Complete prerequisite tasks first';end if;
  insert into public.assignments(task_id,member_id) values(p_task,auth.uid());t.status:='Assigned';
 elsif p_action='assign' then
  if not elevated or p_member is null then raise exception 'Maintainer and member required';end if;
  if p_reviewer is not null and not exists(select 1 from public.roles where user_id=p_reviewer and role in ('reviewer','maintainer','admin')) then raise exception 'Choose an authorized reviewer';end if;
  if t.status='Approved' or (t.status='Submitted for Review' and a.member_id is distinct from p_member) then raise exception 'Cannot reassign reviewed work';end if;
  insert into public.assignments values(p_task,p_member,p_reviewer,null) on conflict(task_id) do update set member_id=excluded.member_id,reviewer_id=excluded.reviewer_id,blocker=null;if t.status<>'Submitted for Review' then t.status:='Assigned';end if;
 elsif p_action='start' then
  if a.member_id is distinct from auth.uid() or t.status not in ('Assigned','Blocked','Changes Requested') then raise exception 'Not allowed';end if;t.status:='In Progress';update public.assignments set blocker=null where task_id=p_task;
 elsif p_action='block' then
  if a.member_id is distinct from auth.uid() or t.status not in ('Assigned','In Progress','Changes Requested') or length(trim(p_value))<3 or length(p_value)>5000 then raise exception 'Provide a blocker for your active task';end if;
  update public.assignments set blocker=p_value where task_id=p_task;t.status:='Blocked';
 elsif p_action='submit' then
  if a.member_id is distinct from auth.uid() or t.status not in ('In Progress','Changes Requested') then raise exception 'Only the assigned member can submit active work';end if;
  if length(p_value)>2000 or p_value !~ '^https://[^[:space:]]+$' then raise exception 'Provide a valid HTTPS work link';end if;
  insert into public.submissions(task_id,member_id,url,notes) values(p_task,auth.uid(),p_value,'');t.status:='Submitted for Review';
 elsif p_action in ('Approved','Changes Requested') then
  if a.reviewer_id is distinct from auth.uid() or a.member_id=auth.uid() or not public.has_role(array['reviewer','maintainer','admin']) or t.status<>'Submitted for Review' then raise exception 'Only the assigned authorized reviewer may review';end if;
  select id into sid from public.submissions where task_id=p_task order by id desc limit 1;
  insert into public.reviews(submission_id,reviewer_id,decision,feedback) values(sid,auth.uid(),p_action,trim(p_value));t.status:=p_action;
 elsif p_action='archive' then
  if not elevated then raise exception 'Maintainer required';end if;t.archived:=true;
 else raise exception 'Unknown action';end if;
 update public.tasks set status=t.status,archived=t.archived,version=version+1,updated_at=now() where id=p_task;
 insert into public.audit_events(actor,task_id,event) values(auth.uid(),p_task,p_action);
end $$;
create function public.save_task(p_data jsonb,p_version integer default 0) returns void language plpgsql security definer set search_path='' as $$
declare old public.tasks;begin
 if not public.has_role(array['maintainer','admin']) then raise exception 'Maintainer required';end if;
 select * into old from public.tasks where id=p_data->>'id' for update;
 if found and old.version<>p_version then raise exception 'Task changed. Reload before saving.';end if;
 insert into public.tasks(id,title,description,initiative_id,track,difficulty,skills,prerequisites,instructions,criteria,deliverable,effort,resources,repository_url)
 values(p_data->>'id',p_data->>'title',p_data->>'description',p_data->>'initiative_id',p_data->>'track',p_data->>'difficulty',array(select jsonb_array_elements_text(p_data->'skills')),p_data->>'prerequisites',array(select jsonb_array_elements_text(p_data->'instructions')),array(select jsonb_array_elements_text(p_data->'criteria')),p_data->>'deliverable',(p_data->>'effort')::integer,p_data->'resources',p_data->>'repository_url')
 on conflict(id) do update set title=excluded.title,description=excluded.description,initiative_id=excluded.initiative_id,track=excluded.track,difficulty=excluded.difficulty,skills=excluded.skills,prerequisites=excluded.prerequisites,instructions=excluded.instructions,criteria=excluded.criteria,deliverable=excluded.deliverable,effort=excluded.effort,resources=excluded.resources,repository_url=excluded.repository_url,version=public.tasks.version+1,updated_at=now();
 insert into public.audit_events(actor,task_id,event) values(auth.uid(),p_data->>'id','Task details saved');end $$;
create function public.save_initiative(p_id text,p_title text,p_description text,p_status text,p_lead uuid,p_version integer) returns void language plpgsql security definer set search_path='' as $$ begin
 if not public.has_role(array['maintainer','admin']) then raise exception 'Maintainer required';end if;
 perform 1 from public.initiatives where id=p_id for update;
 if exists(select 1 from public.initiatives where id=p_id and version<>p_version) then raise exception 'Initiative changed. Reload.';end if;
 insert into public.initiatives(id,title,description,status,lead,specification) values(p_id,p_title,p_description,p_status,p_lead,'{}') on conflict(id) do update set title=excluded.title,description=excluded.description,status=excluded.status,lead=excluded.lead,version=public.initiatives.version+1;end $$;
create function public.record_problem(p_id text,p_url text) returns void language plpgsql security definer set search_path='' as $$ begin if auth.uid() is null then raise exception 'Sign in required';end if;insert into public.problem_completions values(auth.uid(),p_id,p_url,now()) on conflict(user_id,problem_id) do update set submission_url=excluded.submission_url,created_at=now();end $$;
-- Only explicitly authorized database administrators may modify roles. No role-grant RPC.
revoke execute on all functions in schema public from public,anon,authenticated;
grant execute on function public.has_role(text[]),public.can_read_task(text) to anon,authenticated;
grant execute on function public.save_profile(text),public.task_action(text,integer,text,text,uuid,uuid),public.save_task(jsonb,integer),public.save_initiative(text,text,text,text,uuid,integer),public.record_problem(text,text) to authenticated;
