/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function() { 
		/*
		 * Events
		 * @author Jerolin
		 * @param {Object} object If the handlers dosn't have a scope, use this to replace.
		 */
		var Events = {
				
			initialize : function() {
				this.listeners = $H();
			},

			destroy : function() {
				this.listeners = null;
			},

			/*
			 * Observe events
			 * @param {Object} events
			 */
			on : function(events) {
				events = $H(events);
				var scope = events.get("scope");
				scope = scope || this;

				events.each(function(event) {
					if (event.key != "scope") {
						this.observe(event.key, scope, event.value);
					}
				}.bind(this));
			},

			bind : function() {
				this.observe.apply(this, arguments);
			},

			/*
			 * Observe one event.
			 * @param {Object} type Event type.
			 * @param {Object} scope Which in event handler function "this" pointed.
			 * @param {Object} handler Event callback.
			 */
			observe : function(type, scope, handler) {
				
				if (Object.isFunction(scope) && Object.isUndefined(handler)) {
					handler = scope;
					scope = this;
				}

				if (handler !== null) {
					var listeners = this.listeners.get(type);

					// if listeners dosn't have this type of event, create one.
					if (typeof listeners === "undefined") {
						listeners = $A();
						this.listeners.set(type, listeners);
					}

					listeners.push({
						scope : scope,
						handler : handler
					});
				}

			},

			/*
			 * Unbind a event.
			 * @param {Object} type
			 * @param {Object} handler
			 */
			stopObserving : function(type, handler) {
				var listeners = this.listeners.get(type);

				if (listeners !== null) {
					if (!handler) {
						listeners.clear();
						listeners = null;
						this.listeners.unset(type);
					} else {
						for ( var i = 0; i < listeners.length; i++) {
							if (listeners[i].handler == handler) {
								listeners.splice(i, 1);
								break;
							}
						}

						if (listeners.size() === 0) {
							listeners = null;
							this.listeners.unset(type);
						}
					}
				}
			},

			/*
			 * Trigger an event with args.
			 * @param {Object} type Event type
			 * @param {Object} args Arguments to pass to the handler.
			 */
			fire : function(type) {
				var listeners = this.listeners.get(type);
				var continueChain;

				var args = $A(arguments).slice(1);

				if (listeners) {
					for ( var i = 0; i < listeners.length; i++) {
						var callback = listeners[i];
						// bind the context to callback.obj
						continueChain = callback.handler.apply(callback.scope,
								args);

						if ((continueChain !== undefined)&& (continueChain === false)) {
							return false;
							// if callback returns false, execute no more
							// callbacks.
							break;
						}else{
							return true;
						}
					}
				}
			}

		};

		var Maskable = {
				
			isMasked : function() {
				return cloud.util.isMasked(this.element);
			},

			mask : function(label) {
				cloud.util.mask(this.element, label);
			},

			unmask : function() {
				cloud.util.unmask(this.element);
			}
			
		};

		/*
		 * Initialize a Module, create events, unique id of the module.
		 * @author Jerolin 
		 */
		var Module = Class.create({
			id : null,
			moduleName : "module",
			mixins : [ Events ],

			initialize : function() {
				this.mixins.each(function(mixin) {
					cloud.util.mixin(this, mixin);
				}, this);
			},

			mixin : function(mixin) {
				cloud.util.mixin(this, mixin);
			},

			uniqueID : function(prefix) {
				this.id = this.id|| cloud.util.createUniqueID(prefix|| (this.moduleName + "-"));
				return this.id;
			}
		});

		/*
		 * super component class, include an element and a default element.
		 * @author Jerolin
		 */
		var Component = Class.create(Module, {
			moduleName : "component",
			defaultElement : "<div>",

			initialize : function($super, options) {
				$super();
				this.options = {
					disabled : false,
					extraClass : ""
				};
				$.extend(this.options, options || {});
				this.id = this.options.id || null;
				options.selector = $(options.selector || this.template|| this.defaultElement)[0];
				this.element = $(options.selector).addClass(this.options.extraClass);
				if (options.container) {
					this.element.appendTo(options.container);
				}

				if (options.events) {
					this.on(options.events);
				}
				this.uniqueID();
				this.mixin(Maskable);

				this.destroyed = false;
			},

			uniqueID : function($super) {
				this.id = this.element.attr("id") || $super();
				this.element.attr("id", this.id);
			},

			destroy : function() {
				this.id = null;
//				this.element && (this.element.remove());
				if(this.element) this.element.remove();
				this.element = null;
				this.moduleName = null;
				this.destroyed = true;
			},

			enable : function() {
				this.options.disabled = false;
				this.element.removeClass("state-disabled");
			},

			disable : function() {
				this.options.disabled = true;
				this.element.addClass("state-disabled");
			},

			errorMessage : function(text) {
				$.pnotify({
					text : text,
					type : 'error',
					history : false,
					styling : 'jqueryui',
					cornerclass : 'ui-pnotify-sharp'
				});
			},

			appendTo : function(dest) {
				if (dest instanceof cloud.Component) {
					dest.element.append(this.element);
				} else if (dest instanceof jQuery) {
					dest.append(this.element);
				}
			},

			show : function() {
				this.element.show();
			},

			hide : function() {
				this.element.hide();
			}
		});
		
		var View = Class.create(Component, {
		    moduleName : "view",

            initialize : function($super, options){
                $super(options);
                var self = this;
                
                if (options.parent){
                    this.parent = options.parent;
                }
                
                this.context = new Context({
                    view : this,
                    parent : this.parent ? this.parent.$getContext() : null
                });
                
                if (options.contextAttrs){
                    $.extend(this.context, options.contextAttrs);
                };
                
                if (options.controllerCls) {
                    this.controller = new options.controllerCls({
                        context : this.context,
                        parent : this.parent ? this.parent.$getController() : null
                    });
                }else {
                    this.controller = null;
                }
                
                this.$control(this.context);
            },
            
            $control : function(context){
                
            },
            
            $getContext : function(){
                return this.context;
            },
            
            $getController : function(){
                return this.controller;
            },
            
            destroy : function($super) {
                //TODO  can not call $super because of a bug in platform.js
                this.context.$destroy();
                this.context = null;
                this.controller && this.controller.destroy();
                this.parent = null;
                $super();
            },
		});
		
		var Controller =  Class.create(Module, {
            moduleName : "controller",

            initialize : function($super, options){
                $super(options);
                $.extend(this.options, options || {});
                
                //hold context, call Model
                this.view = options.context._$view;// view is required
                this.parent = options.parent;
                
                this.context = options.context;
                
//                this.parent = null;
                this.$prepare(this.context, this.view);
                
                this.$control(this.context, this.view);
                
            },
            
            $prepare : function(context, view){
                
            },
            
            $control : function(context, view){
                
            },
            
            destroy : function() {
                this.context = null;
                this.parent = null;
                this.view = null;
            },
        });
		
		var Context  =  Class.create({
            _moduleName : "context",

            initialize : function(options){
                $.extend(this._$options, options || {});
                
                this._$view = options.view;//view is required
                this._$id = this._$view.id;
                
                this._$parent = null;
                if (options.parent){
                    this.$setParent(options.parent);
                }
                
                this._$childrens = $H();
                
                this._$subs = null;
                
                this._$channel = Postal.channel(this._$id);
                this._$attrs = $H();//chain ?
            },
            
            //broadcast to parent context
            $emitAll : function(name, data){
                if (this._$parent) {
                    this._$parent.$emitAll(name, data);//TODO chain or just one level up?
                }else {
                    this.$broadcast(name, data);
                }
            },
            
            $emit : function(name, data){
                if (this._$parent) {
                    this._$parent.$broadcast(name, data, true);
                }
                this.$broadcast(name, data);
            },
            
            $broadcast : function(name, data, noCascade){
//                this._$channel.publish(name, data);
                cloud.message.post(this._$id, name, data);
                
                if (!noCascade) {
                    this._$childrens.each(function(child){
                        child.value.$broadcast(name, data);
                    })
                }
            },
            
            //TODO scope support
            $on : function(subscribes){
                var self = this;
                cloud.message.on(this._$id, subscribes);
                /*$H(subscribes).each(function(one){
                    self.subs.each(function(sub){
                        if (sub.callback == one.value){
//                            console.log("equals!")
                        }else{
//                            console.log("not equal!");
                        }
                    })
                    
                    self._$subs.push(self._$channel.subscribe(one.key, one.value));
                })*/
            },
            
            /*setAttr : function(name, data){
                
            },
            
            getAttr : function(name){
                
            },*/
            
            $setParent : function(context){
                this._$parent = context;
                context.$addChild(this);
            },
            
            $getParent : function(){
                return this._$parent;
            },
            
            $addChild : function(context){
                this._$childrens.set(context._$id, context);
            },
            
            $removeChild : function(context){
                this._$childrens.remove(context._$id);
            },
            
            $destroy : function() {
                /*this._$subs.each(function(sub){
                    sub.unsubscribe();
                });
                this._$subs = null;*/
//                this._$subs && this._$subs.unbind && this._$subs.unbind();
                
                cloud.message.clearChannel(this._$id);
                
                this._$id = null;
                this._$view = null;
                this._$parent = null;
                this._$childrens.each(function(child){
                    child.destroy && child.destroy();
                });
                this._$childrens = null;
                this._$channel = null;
            },
        });

		cloud.Module = cloud.Module || Module;
		cloud.Component = cloud.Component || Component;
		cloud.View = cloud.View || View;
		cloud.Controller = cloud.Controller || Controller;
	})();