import { Task, User } from "../domain";
import { Status } from "../domain/task";
import { supabase } from "../shared/supabaseClient";

export class SubscribeTasksRealtimeUseCase {
    execute(insertFn: (t: Task) => void, updateFn: (t: Task) => void, deleteFn: (id: number) => void) {
        supabase
            .channel('public')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'task' }, (v) => {
                console.log('INSERT on schema', v);
                if (v.new !== null)
                    insertFn(Task.create(
                        v.new.id,
                        v.new.title,
                        v.new.description,
                        v.new.status as Status,
                        v.new.color,
                        v.new.created_at ?? "",
                        v.new.user_id ? User.create(v.new.user_id, "", "", "", "", "", "") : null
                    ));
            }
            )
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'task' }, (v) => {
                console.log('UPDATE on schema', v)
                if (v.new !== null)
                    updateFn(Task.create(
                        v.new.id,
                        v.new.title,
                        v.new.description,
                        v.new.status as Status,
                        v.new.color,
                        v.new.created_at ?? "",
                        v.new.user_id ? User.create(v.new.user_id, "", "", "", "", "", "") : null
                    ));
            }
            )
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'task' }, (v) => {
                console.log('DELETE on schema', v)
                deleteFn(v.old.id);
            }
            )
            .subscribe((change) => console.log('schema changed', change))
    }
}