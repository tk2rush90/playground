(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{UJRG:function(t,e,s){"use strict";s.r(e),s.d(e,"PerspectivePageModule",function(){return f});var i=s("ofXK"),n=s("tyNb"),o=s("fXoL"),h=s("YrwR"),c=function(t){return t.upward="upward",t.downward="downward",t.none="none",t}({});function a(t,e){let s=0;return t&&e&&(s=Math.hypot(t.pageX-e.pageX,t.pageY-e.pageY)),s}function r(t,e){if(1&t&&(o.Kb(0,"div",2),o.Kb(1,"span"),o.cc(2),o.Jb(),o.Jb()),2&t){const t=o.Sb().$implicit;o.Zb("background-color",t.backgroundColor)("left",t.x+"px")("top",t.y+"px")("transform",t.transform)("z-index",t.zIndex),o.ub(2),o.dc(t.zIndex)}}function d(t,e){if(1&t&&(o.Ib(0),o.bc(1,r,3,11,"div",1),o.Hb()),2&t){const t=e.$implicit;o.ub(1),o.Tb("ngIf",!t.hidden)}}class _{constructor(t){this._frame=0,this._startTime=0,this._distance=0,this._distanceDuration=1e3,this._startDistance=0,this._targetDistance=0,this._changingDistance=0,this._radius=300,this._color=Object(h.c)(["#8D0B0B","#FF8811","#FF3E3E","#1ADBCE","#C73FC7","#3574DF","#EEFF46"]),this._calculateAnimatedDistance=t=>{this._startTime||(this._startTime=t);const e=t-this._startTime;e>this._distanceDuration?this._stopAnimating():(this._distance=function(t,e,s,i){return s*Math.sin(t/i*(Math.PI/2))+e}(Math.min(e,this._distanceDuration),this._startDistance,this._changingDistance,this._distanceDuration),this._animateDistance())},this._center=t.center,this._distance=t.distance||0,this._angle=Object(h.b)(0,360),this._setBasePosition()}_setBasePosition(){var t,e,s;this._position=(e=this._angle,{x:(t=this._center).x+(s=this._radius)*Math.cos(e),y:t.y+s*Math.sin(e)})}get transform(){return`translate3d(-50%, -50%, ${80*this._distance-700}px)`}get backgroundColor(){return this._color}get x(){return this._position.x}get y(){return this._position.y}set distance(t){this._setDistanceTarget(t),this._stopAnimating(),this._animateDistance()}get targetDistance(){return this._targetDistance}get zIndex(){return Math.ceil(100*this._distance)}viewResized(t){this._center=t,this._setBasePosition()}_setDistanceTarget(t){this._startDistance=this._distance,this._targetDistance+=t,this._changingDistance=this._targetDistance-this._startDistance}_animateDistance(){this._frame=requestAnimationFrame(this._calculateAnimatedDistance)}_stopAnimating(){cancelAnimationFrame(this._frame),this._startTime=0}get hidden(){return this._distance<-80||this._distance>40}}let u=(()=>{class t{constructor(t){this.elementRef=t,this.numberOfObjects=100,this.objects=[],this._center={x:0,y:0},this._view={width:0,height:0},this._timers=[],this._startDistance=0,this._movedDistance=0,this._touchStarted=!1,this._scrollSpeed=4,this._handleTouchMove=t=>{this._setTouchMoveDistance(t.touches),this._zoomInOutWithTouches()},this._handleTouchEnd=()=>{this._removeTouchMoveEvent(),this._removeTouchEndEvent(),this._touchStarted=!1}}ngOnInit(){}ngAfterViewInit(){this._setCenterPoint(),this._setViewSize(),this._createObjects(),this._setInitialDistance()}ngOnDestroy(){this._clearAllTimers()}get host(){var t;return null===(t=this.elementRef)||void 0===t?void 0:t.nativeElement}_setCenterPoint(){this.host&&(this._center.x=this.host.offsetWidth/2,this._center.y=this.host.offsetHeight/2)}_setViewSize(){this.host&&(this._view.width=this.host.offsetWidth,this._view.height=this.host.offsetHeight)}_createObjects(){for(let t=0;t<this.numberOfObjects;t++){const t=new _({center:this._center,distance:this.numberOfObjects});this.objects.push(t)}}_setInitialDistance(){this._clearAllTimers(),this._timers=this.objects.map((t,e)=>setTimeout(()=>{t.distance=4*-e+this.numberOfObjects}))}_clearAllTimers(){this._timers.forEach(t=>clearTimeout(t))}onHostWheel(t){this._canScroll(t.deltaY)&&this.objects.forEach(e=>{e.distance=Math.ceil(t.deltaY/100)*this._scrollSpeed})}_canScroll(t){const e=(s=t)>0?c.downward:s<0?c.upward:c.none;var s;const i=this.objects.map(t=>t.targetDistance),n=Math.max(...i),o=Math.min(...i);return e===c.upward&&n>=0||e===c.downward&&o<=0}onWindowResize(){this._setCenterPoint(),this._setViewSize(),this._updateCenterPosition()}_updateCenterPosition(){this.objects.forEach(t=>t.viewResized(this._center))}onHostTouchStart(t){t.touches.length>=2&&(this._setTouchStartDistance(t.touches),this._addTouchMoveEvent(),this._addTouchEndEvent(),this._touchStarted=!0)}_setTouchStartDistance(t){this._startDistance=a(t.item(0),t.item(1))}_addTouchMoveEvent(){this.host&&!this._touchStarted&&this.host.addEventListener("touchmove",this._handleTouchMove)}_setTouchMoveDistance(t){this._movedDistance=a(t.item(0),t.item(1))}_zoomInOutWithTouches(){const t=this._movedDistance-this._startDistance;let e=0;t>10?e=2:t<-10&&(e=-2),this._canScroll(e)&&(this.objects.forEach(t=>{t.distance=e*this._scrollSpeed}),this._startDistance=this._movedDistance)}_addTouchEndEvent(){this.host&&!this._touchStarted&&(this.host.addEventListener("touchend",this._handleTouchEnd),this.host.addEventListener("touchcancel",this._handleTouchEnd))}_removeTouchMoveEvent(){this.host&&this._touchStarted&&this.host.removeEventListener("touchmove",this._handleTouchMove)}_removeTouchEndEvent(){this.host&&this._touchStarted&&(this.host.removeEventListener("touchend",this._handleTouchEnd),this.host.removeEventListener("touchcancel",this._handleTouchEnd))}}return t.\u0275fac=function(e){return new(e||t)(o.Eb(o.l))},t.\u0275cmp=o.yb({type:t,selectors:[["app-perspective-container"]],hostBindings:function(t,e){1&t&&o.Qb("wheel",function(t){return e.onHostWheel(t)})("resize",function(){return e.onWindowResize()},!1,o.Vb)("touchstart",function(t){return e.onHostTouchStart(t)})},decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["class","tk-perspective-item",3,"background-color","left","top","transform","z-index",4,"ngIf"],[1,"tk-perspective-item"]],template:function(t,e){1&t&&o.bc(0,d,2,1,"ng-container",0),2&t&&o.Tb("ngForOf",e.objects)},directives:[i.h,i.i],styles:["[_nghost-%COMP%]{width:100%;height:100%;top:0;left:0;position:absolute;background-color:#333;perspective:700px;overflow:hidden}.tk-perspective-item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;position:absolute;width:200px;height:125px;background-color:#fff;box-shadow:0 3px 10px rgba(0,0,0,.3);font-size:24px}.tk-perspective-item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:0 0 auto}span[_ngcontent-%COMP%]{position:absolute}"]}),t})();const l=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.yb({type:t,selectors:[["app-perspective-page"]],decls:1,vars:0,template:function(t,e){1&t&&o.Fb(0,"app-perspective-container")},directives:[u],styles:[""]}),t})()}];let p=(()=>{class t{}return t.\u0275mod=o.Cb({type:t}),t.\u0275inj=o.Bb({factory:function(e){return new(e||t)},imports:[[n.b.forChild(l)],n.b]}),t})();var m=s("UrJe");let f=(()=>{class t{}return t.\u0275mod=o.Cb({type:t}),t.\u0275inj=o.Bb({factory:function(e){return new(e||t)},imports:[[i.b,p,m.a]]}),t})()}}]);