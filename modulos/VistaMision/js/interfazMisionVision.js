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
        url:'procesos/elementos_json.php?idp='+perspectivaId,
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
                            height:150,
                            title: '<CENTER> VISION</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.vision+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#FFFFFF',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
            },
            {
                            
                            width: 500,
                            height:150,
                            title: '<CENTER> MISION </CENTER>',
                            html: '<font class="signi"> '+jsonResponse.mision+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#FFFFFF',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
             },
              {
                            
                            width: 1000,
                            height:300,
                            title: '<CENTER> VALORES </CENTER>',
                            html: '<font class="signi"> '+jsonResponse.valores+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:2,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#FFFFFF',
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


 //storePerspectiva.load();

var panel_medio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
          ]

 });


var PanelFoda=new Ext.ux.FormularioFODA();
PanelFoda.set_perspectiva(1);
panel_medio.add(PanelFoda);
panel_medio.doLayout();
panel_medio.update();

 var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE PLAN DE ESTRATEGIAS [ Objetivos Estrategicos ] ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[
                      panel_medio
                    ],
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
