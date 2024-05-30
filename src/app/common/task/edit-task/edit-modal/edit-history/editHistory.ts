import { EditType } from 'app/common/task/edit-task/edit-modal/edit-history/editType';

export class EditHistory {
  editDate: Date;
  editType: EditType;
  beforeEdit: string;
  afterEdit: string;


  constructor(editDate: Date, editType: EditType, previousValue: string, afterEdit: string) {
    this.editDate = editDate;
    this.editType = editType;
    this.beforeEdit = previousValue;
    this.afterEdit = afterEdit;
  }

}
