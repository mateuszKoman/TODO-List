import { ComponentRef, Injectable, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { GenericList } from 'app/common/generics/generic-list/generic-list.component';
import { ListIdsService } from 'app/common/generics/generic-list/list-ids-service/list-ids.service';
import { ListPositionService } from 'app/common/task-list/list-position-service/list-position.service';

@Injectable({
  providedIn: 'root'
})
export class GenericListCreatorService {

  private componentCounter = 0;

  private renderer: Renderer2;

  private listComponentRef!: ComponentRef<GenericList>;

  constructor(
    private readonly listIDsService: ListIdsService,
    private readonly rendererFactory: RendererFactory2,
    private readonly listPositionService: ListPositionService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  createGenericList(container: ViewContainerRef) {
    this.listComponentRef = container.createComponent(GenericList);

    this.setPropertiesValue();
    this.setDragAndDropHandlers();
  }

  private setDragAndDropHandlers(): void {
    const element = this.listComponentRef.location.nativeElement;

    this.renderer.setAttribute(element, 'draggable', 'true');
    this.renderer.listen(element, 'dragstart', this.listPositionService.onDragStart.bind(this));
    this.renderer.listen(element, 'drop', this.listPositionService.onDrop.bind(this));
    this.renderer.listen(element, 'dragenter', this.listPositionService.allowDrop.bind(this));
  }

  private setPropertiesValue(): void {
    this.componentCounter++;

    this.listComponentRef.instance.id = this.listIDsService.generateListID();
    this.listComponentRef.instance.listName = `LIST-${this.componentCounter}`;
  }
}
