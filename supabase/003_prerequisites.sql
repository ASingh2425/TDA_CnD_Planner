-- Add to 001 before deployment, or apply after 001 on an existing preview database.
create function public.set_prerequisites(p_task text,p_required text[]) returns void language plpgsql security definer set search_path='' as $$ begin
 if not public.has_role(array['maintainer','admin']) then raise exception 'Maintainer required';end if;
 -- Serialize graph edits so concurrent changes cannot introduce a cycle.
 perform pg_advisory_xact_lock(2682026);
 if p_task=any(p_required) then raise exception 'A task cannot require itself';end if;
 if exists(with recursive ancestors(id) as (select unnest(p_required) union select pr.required_task_id from public.task_prerequisites pr join ancestors a on a.id=pr.task_id) select 1 from ancestors where id=p_task) then raise exception 'Prerequisites would create a cycle';end if;
 delete from public.task_prerequisites where task_id=p_task;
 insert into public.task_prerequisites select p_task,unnest(p_required);
 insert into public.audit_events(actor,task_id,event) values(auth.uid(),p_task,'Prerequisites updated');
end $$;
revoke all on function public.set_prerequisites(text,text[]) from public,anon;
grant execute on function public.set_prerequisites(text,text[]) to authenticated;
