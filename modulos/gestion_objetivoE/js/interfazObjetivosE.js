Ext.ns('form_perspectivas');

form_perspectivas.Panel={
   init:function()
   {
    Ext.form.Field.prototype.msgTarget='side';

/**model**/
Ext.define('perspectivaModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idperspectiva',type:'int'},
   {name:'perspectiva',type:'string'}
  ],
  idProperty:'company'
});


Ext.define('objetivosModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idobj',type:'int'},
   {name:'correlativo',type:'string'},
   {name:'descripciono',type:'string'}
  ],
  idProperty:'company'
});




/***** store ******/

var storePerspectiva=Ext.create('Ext.data.JsonStore',{
  model:'perspectivaModel',
   proxy:{
                type:'ajax',
                url:'procesos/perspectivas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


var storeObjetivos=Ext.create('Ext.data.JsonStore',{
  model:'objetivosModel',
   proxy:{
                type:'ajax',
                url:'procesos/objetivos_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

var smPerspectivas=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                     showPerspectivasForm(0);  
                     formPerspectiva.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm




/**************** formularios *************************/

Ext.define('Ext.ux.FormularioFODA',{
  extend:'Ext.form.Panel',

  initComponent:function(){
       Ext.apply(this,{
        boder:false,
        items:[
        {
            xtype:'form',
            id:'formFODA',
            padding:10,
            items:[
            ]

        }

        ]

       });/*fin de apply*/
       this.callParent(arguments);

  }/*fin de initi*/
  ,
  set_perspectiva:function (perspectivaId){
    this.loadComponentes(perspectivaId);
  },
  loadComponentes:function(perspectivaId){
      Ext.Ajax.request({
        url:'procesos/elementosFoda_json.php?idp='+perspectivaId,
        reader:{
                  type:'json',
                  root:'data'
               },
               success:this.onLoad,
               scope:this
      });
  },
  onLoad:function(response){
   var jsonResponse=Ext.decode(response.responseText);
     if(jsonResponse.success){
         panelMatrix=Ext.create('Ext.panel.Panel', {
                                      width: '100%',
                                      
                                      defaults: {
                                          
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 3px 3px 3px 3px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 2, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });

         panelMatrix.add(
          {
                            
                            width: 500,
                            height:200,
                            title: '<CENTER>FORTALEZA</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.fortalezas+' </font>',
                            collapsible: true,
                            collapsed:true,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#29C1E8',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
            },
            {
                            
                            width: 500,
                            height:200,
                            title: '<CENTER>DEBILIDADES</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.debilidades+' </font>',
                            collapsible: true,
                            collapsed:true,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#dd4742',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
             },
              {
                            
                            width: 500,
                            height:200,
                            title: '<CENTER>OPORTUNIDADES</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.oportunidades+' </font>',
                            collapsible: true,
                            collapsed:true,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#16bc5b',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
             },
             {
                            
                            width: 500,
                            height:200,
                            title: '<CENTER>AMENAZAS</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.amenazas+' </font>',
                            collapsible: true,
                            collapsed:true,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#6d4884',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
             }                         

          );

   this.add(panelMatrix);


     }
  }

});


 function showPerspectivasForm(accion){
                       formPerspectiva=Ext.widget('form',{

                      layout:{
                               type:'table',
                               columns:4,
                               tdAttrs:{
                                valign:'middle'
                               }
                        },
                        fieldDefaults: {
                                    labelWidth: 150,
                                    labelStyle: 'font-weight:bold'
                                },
                        defaults:{
                            frame:false,
                            border: false,
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                        items:[
                                {
                                 xtype:'hiddenfield',
                                 id:'idobj',
                                 colspan:4,
                                 name:'idplan'                  
                                                    
                                },
                                {
                                  html:'<img src="../../recursos/img/diana.png" width="75" height="75">',
                                  colspan:2,
                                  border:false
                                },
                                {
                                 xtype:'hiddenfield',
                                 colspan:2
                                                    
                                },                                
                                {
                                xtype: 'numberfield',
                                id: 'correlativo',
                                colspan:4,
                                width:400,
                                fieldLabel:'Correlativo',
                                labelWidth:200,
                                name: 'correlativo',
                                maxValue: 20,
                                minValue: 1,
                                allowBlank: false
                                
                              },
                              {
                                 xtype:'textareafield',
                                 id:'descripciono',
                                 fieldLabel:'<b>Descripcion del objetivo estrat&eacutegico</b>',
                                 labelWidth:200,
                                 allowBlank:false,
                                 colspan:4,
                                 width:600
                              }
                                                        
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){
                                        
                                        var post_correlativo=Ext.getCmp('correlativo').getValue();
                                        var post_descripcion=Ext.getCmp('descripciono').getValue();
                                        var post_idperspectiva=Ext.getCmp('dataperspectiva').getValue();

                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_objetivo.php?correlativo='+post_correlativo+'&descrip='+post_descripcion+'&idp='+post_idperspectiva,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                        var idp=Ext.getCmp('dataperspectiva').getValue();
                                                                        storeObjetivos.load({params:{idp:idp}});
                                                                          Ext.MessageBox.show({
                                                                              title:'Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.INFO
                                                                          });
                                                                      }
                                                                      if(bandera==2){
                                                                          Ext.MessageBox.show({
                                                                              title:'Sin exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.ERROR
                                                                          });

                                                                      }
                                                                       if(bandera==3){
                                                                          Ext.MessageBox.show({
                                                                              title:'Perspectiva ya existe',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });

                                                                      }


                                                              }//fin de success

                                                          });

                                                     }
                                                     else{//actualizacion
                                                      var id_obj=Ext.getCmp('idobj').getValue();

                                                       Ext.Ajax.request({
                                                          url:'procesos/modificar_objetivo.php?correlativo='+post_correlativo+'&descrip='+post_descripcion+'&idp='+post_idperspectiva+'&idobj='+id_obj,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                          var idp=Ext.getCmp('dataperspectiva').getValue();
                                                                                                          storeObjetivos.load({params:{idp:idp}});                                                                                                         
                                                                                                          
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Exito',
                                                                                                           msg:msj,
                                                                                                           buttons:Ext.MessageBox.OK,
                                                                                                           icon: Ext.MessageBox.INFO
                                                                                                           });
                                                                                                          }
                                                      
                                                                                                  if(bandera==2) { 
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Sin exito',
                                                                                                          msg:msj,
                                                                                                          buttons:Ext.MessageBox.OK,
                                                                                                          icon: Ext.MessageBox.ERROR
                                                                                                          });
                                                      
                                                                                                                 }              
                                                        
                                                                },
                                                                  failure: function(result,request){
                                                                                   Ext.MessageBox.show({
                                                                                   title:'Subcategoria',
                                                                                   msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                                                   buttons:Ext.MessageBox.OK,
                                                                                   icon: Ext.MessageBox.WARNING
                                                                                    });
                                                                                                      
                                                                   }          
                                                      
                                                      
                                                          });
                                                      





                                                     }

                                this.up('form').getForm().reset();
                                this.up('window').destroy();

                                        
                              }//fin de valid
                              else{
                                Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                              }

                            }//fin del handler


                          },
                          {
                            text:'<b>CANCELAR</b>',
                            
                            iconCls:'icon-CANCEL',
                            width:175,
                            handler:function(){
                                this.up('form').getForm().reset();
                                this.up('window').destroy();
                                }

                          }

                        ]


                     });

     
     
    

      var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE OBJETIVOS ESTRAT&EacuteGICOS',
                closable: true,
                width: 650,
                height:300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formPerspectiva
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm






storePerspectiva.load();

var gridObjetivos=Ext.create('Ext.grid.Panel',{
  store:storeObjetivos,
  stateful:true,
  collapsible:false,
  selModel:smPerspectivas,
  multiSelect:true,
  stateId:'stateGrid',

  columns:[
        {
          text:'IDOBETIVO',
          sortable:false,
          dataIndex:'idobj',
          hidden:true
        },
        {
      text:'<b> CORRELATIVO </b>',
      sortable:true,
      width:150,
      dataIndex:'correlativo'
       }
       ,
    
    {
      text:'<b>DESCRIPCION</b>',
      sortable:true,
      flex:1,
      dataIndex:'descripciono'
    }
      ],
        tbar:[
            '->','-',
                         
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-plan_add',
                text: '<b>Nuevo Objetivo estrategico</b>',
                id: 'btnaddPlan',
                               
                handler:function(){
                  showPerspectivasForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-plan_delete',
                text: '<b>Borrar Objetivo estrategico</b>',
                id: 'btndeletePlan',
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿borrar los objetivos seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridObjetivos.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idobj');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_objetivo.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                  var idp=Ext.getCmp('dataperspectiva').getValue();
                                                                  storeObjetivos.load({params:{idp:idp}});                                                                    
                                                                  }
                                                                  if (bandera==2||bandera==3) {

                                                                       Ext.MessageBox.show({
                                                                              title:'Sin Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });//fin de msj

                                                                  }


                                            }//fin del success
                                        });
                                        
                                      });
                                    }//fin del yes

                      });


                }//fin del handler

                
              }


            ]


  });

 var panel_medio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
    ]

 });

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Objetivos Estrategicos ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[
                       {
                
                    xtype : 'combo',
                    id : 'dataperspectiva',
                    store : storePerspectiva,
                    displayField:'perspectiva',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idperspectiva',
                    hiddenName : 'idperspectiva',
                    fieldLabel: '<b>Perspectiva (*)</b>',
                    labelWidth:200,
                    width:500,
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'Seleccione una perspectiva',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                             panel_medio.removeAll(true);
                             storeObjetivos.load({params:{idp:newVal}});
                             var PanelFoda=new Ext.ux.FormularioFODA();
                             PanelFoda.set_perspectiva(newVal);
                             panel_medio.add(PanelFoda);
                             panel_medio.doLayout();
                             panel_medio.update();
                            
                             }
                         }
                
                },panel_medio,

                    gridObjetivos],
                    renderTo:'contenido-perspectivas',
                    width:'95%',
                    bbar:[{text:'<center><b><font size="2">AVANCE Y DESEMPE&Ntilde;O S.A. de C.V </font></b><b><font size="1"> &copy; DERECHOS RESERVADOS '+ new Date().getFullYear()+'</font></b></center>'}]
            });   


var Plogout=new Ext.FormPanel({
          id:'idlogout',
          width:125,
          //renderTo:'logout',

          items:[
          {
            xtype:'button',
            text:'<b>Cerrar Session</b>',
            width:125
          }
          ]

        });

   }/*fin del init*/

};/*fin de for_perpectivas*/

Ext.onReady(form_perspectivas.Panel.init,form_perspectivas.Panel);
