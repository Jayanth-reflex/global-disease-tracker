import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MdbPopoverComponent } from './popover.component';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbPopoverDirective {
    constructor(_overlay, _overlayPositionBuilder, _elementRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this.mdbPopover = '';
        this.mdbPopoverTitle = '';
        this._popoverDisabled = false;
        this.placement = 'top';
        this._animation = false;
        this.trigger = 'click';
        this.delayShow = 0;
        this.delayHide = 0;
        this.offset = 4;
        this.popoverShow = new EventEmitter();
        this.popoverShown = new EventEmitter();
        this.popoverHide = new EventEmitter();
        this.popoverHidden = new EventEmitter();
        this._open = false;
        this._showTimeout = 0;
        this._hideTimeout = 0;
        this._destroy$ = new Subject();
    }
    get popoverDisabled() {
        return this._popoverDisabled;
    }
    set popoverDisabled(value) {
        this._popoverDisabled = coerceBooleanProperty(value);
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = coerceBooleanProperty(value);
    }
    ngOnInit() {
        if (this.popoverDisabled || (this.mdbPopover === '' && this.mdbPopoverTitle === '')) {
            return;
        }
        this._bindTriggerEvents();
    }
    ngOnDestroy() {
        if (this._open) {
            this.hide();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindTriggerEvents() {
        const triggers = this.trigger.split(' ');
        triggers.forEach((trigger) => {
            if (trigger === 'click') {
                fromEvent(this._elementRef.nativeElement, trigger)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.toggle());
            }
            else if (trigger !== 'manual') {
                const evIn = trigger === 'hover' ? 'mouseenter' : 'focusin';
                const evOut = trigger === 'hover' ? 'mouseleave' : 'focusout';
                fromEvent(this._elementRef.nativeElement, evIn)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.show());
                fromEvent(this._elementRef.nativeElement, evOut)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.hide());
            }
        });
    }
    _createOverlayConfig() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._elementRef)
            .withPositions(this._getPosition());
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy,
        });
        return overlayConfig;
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _getPosition() {
        let position;
        const positionTop = {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionBottom = {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionRight = {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: this.offset,
        };
        const positionLeft = {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -this.offset,
        };
        switch (this.placement) {
            case 'top':
                position = [positionTop, positionBottom];
                break;
            case 'bottom':
                position = [positionBottom, positionTop];
                break;
            case 'left':
                position = [positionLeft, positionRight, positionTop, positionBottom];
                break;
            case 'right':
                position = [positionRight, positionLeft, positionTop, positionBottom];
                break;
            default:
                break;
        }
        return position;
    }
    show() {
        if (this._hideTimeout) {
            this._overlayRef.detach();
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
        this._createOverlay();
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
        this._showTimeout = setTimeout(() => {
            const tooltipPortal = new ComponentPortal(MdbPopoverComponent);
            this.popoverShow.emit(this);
            this._open = true;
            this._tooltipRef = this._overlayRef.attach(tooltipPortal);
            this._tooltipRef.instance.content = this.template || this.mdbPopover;
            this._tooltipRef.instance.title = this.mdbPopoverTitle;
            this._tooltipRef.instance.animation = this.animation;
            this._tooltipRef.instance.animationState = 'visible';
            this._tooltipRef.instance.markForCheck();
            this.popoverShown.emit(this);
        }, this.delayShow);
    }
    hide() {
        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }
        else {
            return;
        }
        this._hideTimeout = setTimeout(() => {
            this.popoverHide.emit(this);
            if (!this._tooltipRef) {
                this._overlayRef.detach();
                this._open = false;
                this.popoverHidden.emit(this);
            }
            else {
                this._tooltipRef.instance._hidden.pipe(first()).subscribe(() => {
                    this._overlayRef.detach();
                    this._open = false;
                    this.popoverHidden.emit(this);
                });
                this._tooltipRef.instance.animationState = 'hidden';
                this._tooltipRef.instance.markForCheck();
            }
        }, this.delayHide);
    }
    toggle() {
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
MdbPopoverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbPopoverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.4", type: MdbPopoverDirective, selector: "[mdbPopover]", inputs: { mdbPopover: "mdbPopover", mdbPopoverTitle: "mdbPopoverTitle", popoverDisabled: "popoverDisabled", placement: "placement", template: "template", animation: "animation", trigger: "trigger", delayShow: "delayShow", delayHide: "delayHide", offset: "offset" }, outputs: { popoverShow: "popoverShow", popoverShown: "popoverShown", popoverHide: "popoverHide", popoverHidden: "popoverHidden" }, exportAs: ["mdbPopover"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbPopover]',
                    exportAs: 'mdbPopover',
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }]; }, propDecorators: { mdbPopover: [{
                type: Input
            }], mdbPopoverTitle: [{
                type: Input
            }], popoverDisabled: [{
                type: Input
            }], placement: [{
                type: Input
            }], template: [{
                type: Input
            }], animation: [{
                type: Input
            }], trigger: [{
                type: Input
            }], delayShow: [{
                type: Input
            }], delayHide: [{
                type: Input
            }], offset: [{
                type: Input
            }], popoverShow: [{
                type: Output
            }], popoverShown: [{
                type: Output
            }], popoverHide: [{
                type: Output
            }], popoverHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQU81RSxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLG1CQUFtQjtJQTJDOUIsWUFDVSxRQUFpQixFQUNqQix1QkFBK0MsRUFDL0MsV0FBdUI7UUFGdkIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBN0N4QixlQUFVLEdBQThCLEVBQUUsQ0FBQztRQUMzQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQVN0QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVVuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFDbEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxX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QkFBdkIsS0FBSztnQkFHRixlQUFlO3NCQURsQixLQUFLO2dCQVNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRixTQUFTO3NCQURaLEtBQUs7Z0JBU0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgT3ZlcmxheVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNZGJQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJQb3BvdmVyXScsXG4gIGV4cG9ydEFzOiAnbWRiUG9wb3ZlcicsXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbWRiUG9wb3ZlcjogVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBtZGJQb3BvdmVyVGl0bGUgPSAnJztcblxuICBASW5wdXQoKVxuICBnZXQgcG9wb3ZlckRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb3BvdmVyRGlzYWJsZWQ7XG4gIH1cbiAgc2V0IHBvcG92ZXJEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BvcG92ZXJEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcG9wb3ZlckRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcGxhY2VtZW50ID0gJ3RvcCc7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhbmltYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbjtcbiAgfVxuICBzZXQgYW5pbWF0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb24gPSBmYWxzZTtcblxuICBASW5wdXQoKSB0cmlnZ2VyID0gJ2NsaWNrJztcbiAgQElucHV0KCkgZGVsYXlTaG93ID0gMDtcbiAgQElucHV0KCkgZGVsYXlIaWRlID0gMDtcbiAgQElucHV0KCkgb2Zmc2V0ID0gNDtcblxuICBAT3V0cHV0KCkgcG9wb3ZlclNob3c6IEV2ZW50RW1pdHRlcjxNZGJQb3BvdmVyRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBvcG92ZXJTaG93bjogRXZlbnRFbWl0dGVyPE1kYlBvcG92ZXJEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcG9wb3ZlckhpZGU6IEV2ZW50RW1pdHRlcjxNZGJQb3BvdmVyRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBvcG92ZXJIaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJQb3BvdmVyRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIF90b29sdGlwUmVmOiBDb21wb25lbnRSZWY8TWRiUG9wb3ZlckNvbXBvbmVudD47XG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvd1RpbWVvdXQ6IGFueSA9IDA7XG4gIHByaXZhdGUgX2hpZGVUaW1lb3V0OiBhbnkgPSAwO1xuXG4gIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9vdmVybGF5UG9zaXRpb25CdWlsZGVyOiBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBvcG92ZXJEaXNhYmxlZCB8fCAodGhpcy5tZGJQb3BvdmVyID09PSAnJyAmJiB0aGlzLm1kYlBvcG92ZXJUaXRsZSA9PT0gJycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYmluZFRyaWdnZXJFdmVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JpbmRUcmlnZ2VyRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy50cmlnZ2VyLnNwbGl0KCcgJyk7XG5cbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRvZ2dsZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gJ21hbnVhbCcpIHtcbiAgICAgICAgY29uc3QgZXZJbiA9IHRyaWdnZXIgPT09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbic7XG4gICAgICAgIGNvbnN0IGV2T3V0ID0gdHJpZ2dlciA9PT0gJ2hvdmVyJyA/ICdtb3VzZWxlYXZlJyA6ICdmb2N1c291dCc7XG5cbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZJbilcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zaG93KCkpO1xuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBldk91dClcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVBvc2l0aW9uQnVpbGRlclxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZWxlbWVudFJlZilcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9uKCkpO1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKSxcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3ZlcmxheUNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2NyZWF0ZU92ZXJsYXlDb25maWcoKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbigpOiBDb25uZWN0ZWRQb3NpdGlvbltdIHtcbiAgICBsZXQgcG9zaXRpb247XG5cbiAgICBjb25zdCBwb3NpdGlvblRvcCA9IHtcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICBvZmZzZXRZOiAtdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uQm90dG9tID0ge1xuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnY2VudGVyJyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFk6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvblJpZ2h0ID0ge1xuICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICdjZW50ZXInLFxuICAgICAgb2Zmc2V0WDogdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uTGVmdCA9IHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcbiAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgIG92ZXJsYXlZOiAnY2VudGVyJyxcbiAgICAgIG9mZnNldFg6IC10aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ub3AsIHBvc2l0aW9uQm90dG9tXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkJvdHRvbSwgcG9zaXRpb25Ub3BdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkxlZnQsIHBvc2l0aW9uUmlnaHQsIHBvc2l0aW9uVG9wLCBwb3NpdGlvbkJvdHRvbV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvblJpZ2h0LCBwb3NpdGlvbkxlZnQsIHBvc2l0aW9uVG9wLCBwb3NpdGlvbkJvdHRvbV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZVRpbWVvdXQpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5faGlkZVRpbWVvdXQpO1xuICAgICAgdGhpcy5faGlkZVRpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2NyZWF0ZU92ZXJsYXkoKTtcblxuICAgIGlmICh0aGlzLl9oaWRlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2hpZGVUaW1lb3V0KTtcbiAgICAgIHRoaXMuX2hpZGVUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9zaG93VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdG9vbHRpcFBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWRiUG9wb3ZlckNvbXBvbmVudCk7XG5cbiAgICAgIHRoaXMucG9wb3ZlclNob3cuZW1pdCh0aGlzKTtcbiAgICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLl90b29sdGlwUmVmID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2godG9vbHRpcFBvcnRhbCk7XG5cbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UuY29udGVudCA9IHRoaXMudGVtcGxhdGUgfHwgdGhpcy5tZGJQb3BvdmVyO1xuICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS50aXRsZSA9IHRoaXMubWRiUG9wb3ZlclRpdGxlO1xuICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbjtcbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UuYW5pbWF0aW9uU3RhdGUgPSAndmlzaWJsZSc7XG4gICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICB0aGlzLnBvcG92ZXJTaG93bi5lbWl0KHRoaXMpO1xuICAgIH0sIHRoaXMuZGVsYXlTaG93KTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Nob3dUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd1RpbWVvdXQpO1xuICAgICAgdGhpcy5fc2hvd1RpbWVvdXQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucG9wb3ZlckhpZGUuZW1pdCh0aGlzKTtcbiAgICAgIGlmICghdGhpcy5fdG9vbHRpcFJlZikge1xuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9wb3ZlckhpZGRlbi5lbWl0KHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5faGlkZGVuLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnBvcG92ZXJIaWRkZW4uZW1pdCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UuYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzLmRlbGF5SGlkZSk7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYW5pbWF0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9wb3BvdmVyRGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==