import { Injectable } from '@angular/core';
import { Task } from 'app/common/task/task';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddNewTaskService {


  private readonly backlogCollectionName = 'backlog';

  constructor(
    private readonly angularFirestore: AngularFirestore
  ) {
  }

  getBacklog(): Observable<Task[]> {
    return this.angularFirestore.collection<Task>(this.backlogCollectionName).valueChanges();
  }

  addTaskToBacklog(task: Task) {
    this.angularFirestore.collection<Task>(this.backlogCollectionName).add({...task})
      .catch(error => console.error('Error during adding Task to database', error));
  }
}

