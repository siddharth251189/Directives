# Directives

## ngFor and ngIf

ngFor: We use ngFor directive for run a loop
ngIf: We use ngIf directive for condition check

Here is an example how can we use both ngFor and ngIf:

#### app.component.html

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">
        Only show odd numbers
      </button>
      <br /><br />
      <div *ngIf="onlyOdd">
        <ul>
          <li class="list-group-item" *ngFor="let odd of oddNumber">
            {{ odd }}
          </li>
        </ul>
      </div>
      <div *ngIf="!onlyOdd">
        <ul>
          <li class="list-group-item" *ngFor="let even of evenNumber">
            {{ even }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

#### app.component.ts

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  oddNumber = [1, 3, 5];
  evenNumber = [2, 4];
  onlyOdd = false;
}
```

## ngClass and ngStyle

ngClass: We use ngClass for add any class conditionally.
ngStyle: We use ngStyle for add any style conditionally.

Here is an example how can we use both ngClass and ngStyle:

#### app.component.html

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">
        Only show odd numbers
      </button>
      <br /><br />
      <div *ngIf="onlyOdd">
        <ul>
          <li
            class="list-group-item"
            *ngFor="let odd of oddNumber"
            [ngClass]="{ odd: odd % 2 !== 0 }"
            [ngStyle]="{ backgroundColor: odd % 2 !== 0 ? 'yellow' : 'green' }"
          >
            {{ odd }}
          </li>
        </ul>
      </div>
      <div *ngIf="!onlyOdd">
        <ul>
          <li
            class="list-group-item"
            *ngFor="let even of evenNumber"
            [ngClass]="{ even: odd % 2 == 0 }"
            [ngStyle]="{ backgroundColor: even % 2 == 0 ? '#eee' : 'green' }"
          >
            {{ even }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

## Creating a Basic Attribute Directive

For creating a custom directive we need to import Directive decorator from
angular/core.

Here is an example of custom directive currently this directive is doing nothing

```typescript
import { Directive } from "@angular/core";
@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective {}
```

Here we are going to make a directive which will highlight the background color of the element.

#### basic-highlight.ts

```typescript
import { OnInit, Directive, ElementRef } from "@angular/core";
@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = "red";
  }
}
```

#### app.component.html

```html
<p appBasicHighlight>This is basic directive</p>
```

#### app.module.ts

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BasicHighlightDirective } from "./basic-highlight/basic-highlight";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, BasicHighlightDirective],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Using the Renderer to build a Better Attribute Directive

##### Renderer2 is not related to directive,this class have many DOM manipulation methods. we are frequently using Renderer2 in directive because we are selecting the element the DOM and changing them.

By the Renderer2 we can make better attribute directive and this is an recommended method for create an attribute directive.

For Renderer2 method we need to import Renderer2 from angular/core.

#### better-highlight.directive.ts

```typescript
import { OnInit, Directive, Renderer2, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }
}
```

#### app.component.html

```html
<p appBetterHighlight>This is better highlight directive</p>
```

## Using HostListener to Listen to Host Events

angular.io :This Decorator that declares a DOM event to listen for, and provides a handler method to run when that event occurs.

If we want attach any event for example if we want add mouseover and mouse leave functionlty to our directive so we can achieve this goal by @HostListener decorator.

#### better-highlight.directive.ts

```typescript
import {
  OnInit,
  Directive,
  Renderer2,
  ElementRef,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "transparent"
    );
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, "background-color", "red");
  }
}
```

## Using HostBinding to Bind to Host Properties

angular.io :This decorator that marks a DOM property as a host-binding property and supplies configuration metadata. Angular automatically checks host property bindings during change detection, and if a binding changes it updates the host element of the directive.

By this decoratorwe can bind property to DOM element and Angular automatically checks host property bindings during change detection, and if a binding changes it updates the host element of the directive.

#### better-highlight.directive.ts

```typescript
import { OnInit, Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding("style.backgroundColor") backgroungColor: string = "red";

  constructor() {}
  ngOnInit() {}

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroungColor = "yellow";
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroungColor = "#eee";
  }
}
```

## Binding to Directive Properties

In our previous example we are passing color directly in our code but now we want to pass the color from property binding means we can pass the color from our template file like defaultColor="transparent" and highlightColor="red" .

#### better-highlight.directive.ts

```typescript
import {
  OnInit,
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string;
  @HostBinding("style.backgroundColor") backgroungColor: string = this
    .defaultColor;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  ngOnInit() {}

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroungColor = this.highlightColor;
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroungColor = this.defaultColor;
  }
}
```

## What Happens behind the Scenes on Structural Directives

Use of asterisk sign(\*) in structural directive.

When we put \* before any structural directive then angular attach an <ng-template> by itself in backend.

We can understand this by an example.In this example we will use ngIf without the \* sign with <ng-template> and without <ng-template>.

In this first example we are using ngif with out star and we are not going to use <ng-template>.

#### app.component.html

```html
<div>
  <ul>
    <li
      class="list-group-item"
      *ngFor="let even of evenNumber"
      [ngClass]="{ even: odd % 2 == 0 }"
      [ngStyle]="{ backgroundColor: even % 2 == 0 ? '#eee' : 'green' }"
    >
      {{ even }}
    </li>
  </ul>
</div>
```

After run this code we wil face an error of like below

AppComponent.html:32 ERROR NullInjectorError: StaticInjectorError(AppModule)[NgForOf -> TemplateRef]:
StaticInjectorError(Platform: core)[NgForOf -> TemplateRef]:
NullInjectorError: No provider for TemplateRef!
at NullInjector.get (http://localhost:4200/vendor.js:36417:27)
at resolveToken (http://localhost:4200/vendor.js:51335:24)
at tryResolveToken (http://localhost:4200/vendor.js:51261:16)
at StaticInjector.get (http://localhost:4200/vendor.js:51111:20)
at resolveToken (http://localhost:4200/vendor.js:51335:24)
at tryResolveToken (http://localhost:4200/vendor.js:51261:16)
at StaticInjector.get (http://localhost:4200/vendor.js:51111:20)
at resolveNgModuleDep (http://localhost:4200/vendor.js:62298:29)
at NgModuleRef\_.get (http://localhost:4200/vendor.js:63364:16)
at resolveDep (http://localhost:4200/vendor.js:63895:45)

Now we will add <ng-template> instead of div and run the project.

#### app.component.html

```html
<ng-template ngIf="!onlyOdd">
  <ul>
    <li
      class="list-group-item"
      *ngFor="let even of evenNumber"
      [ngClass]="{ even: odd % 2 == 0 }"
      [ngStyle]="{ backgroundColor: even % 2 == 0 ? '#eee' : 'green' }"
    >
      {{ even }}
    </li>
  </ul>
</ng-template>
```

After runing this code we will find that code is runing as expected without any error.

## Building a Structural Directive

we know login behind adding the asterisk sign(\*) in structural directive.
Next we are going to make an structural directive opposite to ngIf.This directive will show the content when condition will be false.

Here we have an structural directive :

#### unless.directive.ts

```typescript
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[appUnless]"
})
export class UnlessDirective {
  @Input() set unless(condition: boolean) {
    if (!condition) {
    } else {
    }
  }
  constructor() {}
}
```

In this directive we have two condition block.First one will excute when condition will be false and second will excute when condition will true.but as we know that every structural directive needs <ng-template> so we need to import TemplateRef.

Access a TemplateRef instance by placing a directive on an <ng-template> element (or directive prefixed with \*). The TemplateRef for the embedded view is injected into the constructor of the directive, using the TemplateRef token.

Along the TemplateRef we need to import ViewContainerRef also.

TemplateRef Represents a container where one or more views can be attached to a component.

Can contain host views (created by instantiating a component with the createComponent() method), and embedded views (created by instantiating a TemplateRef with the createEmbeddedView() method).

#### unless.directive.ts

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]"
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.VCRef.createEmbeddedView(this.temRef);
    } else {
      this.VCRef.clear();
    }
  }
  constructor(
    private temRef: TemplateRef<any>,
    private VCRef: ViewContainerRef
  ) {}
}
```

Here we are adding our unless directive. According to our logic implemented in the directive it will check if given condition is false then only it will show list of even number and in our app.component.ts we have set onlyOdd = false.

#### app.component.html

```html
<div *appUnless="onlyOdd">
  <ul>
    <li
      class="list-group-item"
      *ngFor="let even of evenNumber"
      [ngClass]="{ even: odd % 2 == 0 }"
      [ngStyle]="{ backgroundColor: even % 2 == 0 ? '#eee' : 'green' }"
    >
      {{ even }}
    </li>
  </ul>
</div>
```

## Understanding ngSwitch

We use ngSwitch for multiple conditions. let's see how can we use ngSwitch.
In this example we have a propert named value

```html
<div [ngSwitch]="value">
  <p *ngSwitchCase="10">Value is 10</p>
  // This will show when value will be 10
  <p *ngSwitchCase="20">Value is 20</p>
  // This will show when value will be 20
  <p *ngSwitchCase="30">Value is 30</p>
  // This will show when value will be 13
  <p *ngSwitchDefault>This is default value</p>
  // This will show when it will not find any case
</div>
```
