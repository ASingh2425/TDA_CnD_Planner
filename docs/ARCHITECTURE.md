# Architecture

The current application is a static React/TypeScript/Vite website with hash routing, responsive CSS and Lucide icons. It has no authentication provider, API client, database, member profiles or administrative operations.

main.tsx owns navigation and the public homepage/project directory. MemberPages.tsx provides learning tracks, task discovery/detail and competitive programming. Resources.tsx offers public resource search and all original milestone definitions. Visualizer.tsx renders pure algorithm frames from algorithms.ts.

Public content lives in data.ts and initiatives.json. Search/filter and animation state is held only in memory. No personal progress or shared operational records are stored. All tracks and task instructions are available immediately, including advanced tracks; prerequisites describe recommended knowledge rather than permissions.

The previous Supabase implementation was removed at the user's request. Its historical code is available in Git history, not in the current bundle. The old maintainer hash route resolves to the public Resources page.
