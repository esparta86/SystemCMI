Ext.ns('reportecmi_unidades');

reportecmi_unidades.Panel={
   init:function()
   {
    Ext.form.Field.prototype.msgTarget='side';

/**model**/

Ext.define('unidadesModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idunidad',type:'int'},
   {name:'unidad',type:'string'}
  ],
  idProperty:'company'
});




/***** store ******/

var storeUnidades=Ext.create('Ext.data.JsonStore',{
  model:'unidadesModel',
   proxy:{
                type:'ajax',
                url:'procesos/unidades_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});






/**************** formularios *************************/

Ext.define('Ext.ux.ReporteCmixPerpestiva',{
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
        url:'procesos/reporte_json.php?idp='+perspectivaId,
        reader:{
                  type:'json',
                  root:'data'
               },
               success:this.onLoad,
               scope:this
      });
  },
  onLoad:function(response){
      this.add( {
                            
                            width: '100%',
                            height:500,
                            title: '<CENTER>Consulta de CMI por perspectivas</CENTER>',
                            html: ''+response.responseText+'',
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
             });
  }

});

storeUnidades.load();

 var panel_medio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'95%',
  collapsible:false,
  border:false,
    items:[

    ]

 });


var splitMenu=Ext.create('Ext.button.Split',{
width:150,
iconCls: 'icon-reporte',
text:'Tipo de Reporte',
menu:new Ext.menu.Menu({
items:[
      {
        text:'Pdf',
        handler:function(){
              var idPerspectiva=Ext.getCmp('dataperspectiva').getValue();
              if(idPerspectiva!=null)
              {
               // location.href='procesos/pdfReporteCMIxperspectivas.php?idp='+idPerspectiva;    
              }else{
                   Ext.MessageBox.show({
                       title:'status',
                       msg:'Seleccione una perspectiva.',
                       buttons:Ext.MessageBox.OK,
                       icon: Ext.MessageBox.INFO
                    });
              }
           }
      },
      {
        text:'Excel',
        handler:function(){
              var id=Ext.getCmp('idunidad').getValue();
              if(id!=null)
              {
                location.href='procesos/excelReporteCmiUnidad.php?idU='+id;    
              }else{
                   Ext.MessageBox.show({
                       title:'status',
                       msg:'Seleccione una Unidad organizativa.',
                       buttons:Ext.MessageBox.OK,
                       icon: Ext.MessageBox.INFO
                    });
              }          
             
        }
      }

      ]
})

});

var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE PLAN [ Consulta CMI por unidad organizativa ] ' ,
                    border:false,
                    bodyStyle: 'padding:15px;',
                    items    :[
                       {
                
                    xtype : 'combo',
                    id : 'idunidad',
                    store : storeUnidades,
                    displayField:'unidad',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idunidad',
                    hiddenName : 'idunidad',
                    fieldLabel: '<b>Unidad organizativa </b>',
                    labelWidth:200,
                    width:700,
                    padding:15,
                    allowBlank: false,
                    emptyText : 'Seleccione una unidad',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                            /* panel_medio.removeAll(true);
                            
                             var PanelReporte=new Ext.ux.ReporteCmixPerpestiva();
                             PanelReporte.set_perspectiva(newVal);
                             panel_medio.add(PanelReporte);

                             panel_medio.doLayout();
                             panel_medio.update();*/

                           
                             }
                         }
                
                },splitMenu,

                panel_medio

                    ],
                    renderTo:'contenido-cmiperspectivas',
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

Ext.onReady(reportecmi_unidades.Panel.init,reportecmi_unidades.Panel);
