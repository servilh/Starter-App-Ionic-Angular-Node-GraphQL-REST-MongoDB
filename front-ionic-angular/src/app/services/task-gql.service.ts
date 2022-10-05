import { Injectable } from '@angular/core'; 
import { FetchResult } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Apollo, ApolloBase, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Task from '../../../../common/src/models/task';



@Injectable({
  providedIn: 'root'
})
export class TasksGqlService {
  private apollo: ApolloBase;
  public tasksCache: Array<Task>;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('newClientName');
  }

  private Q_GET_TASKS = gql`
    {
      getTasks{
          _id,
          name,
          status,
          priority
      }
    }
  `;
  GetItems(): Observable<ApolloQueryResult<Array<Task>>> {
    return this.apollo.watchQuery<any>({
      query: this.Q_GET_TASKS,
    }).valueChanges.pipe(map((result) => {
      result.data = result.data?.getTasks
      return result;
    }), tap((result) => this.tasksCache = result.data));
  }

  private Q_GET_TASK = gql`
    {
      getTask(id: $id){
          _id,
          name,
          status,
          priority
      }
    }
`;
  GetItem(id: string): Observable<ApolloQueryResult<Task>> {
    return this.apollo.watchQuery<any>({
      query: this.Q_GET_TASK,
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(map((result) => {
      result.data = result.data?.getTasks
      return result;
    }), tap((result) => this.tasksCache = result.data));
  }

  private MUTATION_UPSERT = gql`mutation upsertTask($task: TaskInput!) {
    upsertTask(task: $task)
  }`;
  Upsert(task: Task): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: this.MUTATION_UPSERT,
      variables: {
        task: {
          id: task._id,
          name: task.name,
          status: task.status,
          priority: Number(task.priority)
        }
      },
      //REFRESHING ALL QUERY CACHE
      refetchQueries: [
        {
          query: this.Q_GET_TASKS
        },
      ],
    }).pipe(map((result) => {
      result.data = result.data;
      return result;
    }));
  }

  Delete(id: string): Observable<MutationResult<any>> {
    const MUTATION_UPSERT = gql`mutation deleteTask($id: String!) {
      deleteTask(id: $id)
    }`;

    return this.apollo.mutate({
      mutation: MUTATION_UPSERT,
      variables: {
        id: id
      },
      update: (store, dataRes: Omit<FetchResult<any, Record<string, any>, Record<string, any>>, "context">) => {
        // Read the data from our cache for this query.  
        const data: any = store.readQuery({ query: this.Q_GET_TASKS });
        // Add our comment from the mutation to the end.
        var id2find = String(dataRes.data.deleteTask);  
        const newData =  data.getTasks.filter((e) => String(e._id) != id2find);
        store.writeQuery({ query: this.Q_GET_TASKS, data: { getTasks: newData } });        
      }
    }).pipe(map((result) => {
      result.data = result.data;
      return result;
    }));
  }

}
