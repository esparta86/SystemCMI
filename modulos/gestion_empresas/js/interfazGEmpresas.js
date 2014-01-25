/**************************************************************************************/    
/* CREACION DEL FORMULARIO */
Ext.onReady(function(){
function showContactForm(accion) {

        form = Ext.widget('form', {
            padding:5,
             layout: {
                            type: 'table',
                            columns: 4, 
                            tdAttrs: {
                                valign: 'middle'
                            }
                },
                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                          style: 'margin: 5px 5px 5px 0px;'
                },
                
                items: [ 
                    {
                        xtype: 'hiddenfield',
                        id:'idempresa',
                        colspan:4,
                        name: 'idempresa'
                    },
                      {
                          xtype: 'textfield',
                          fieldLabel: 'Nombre de la Empresa (*)',
                          id: 'empresa',
                          name: 'empresa',
                          width:400,
                          colspan:4,
                          allowBlank: false
                      },
                    {
                            xtype:'filefield',
                            name:'imagen',
                            fieldLabel:'Imagen de la empresa. (*)',
                            buttonText:'Seleccione una imagen',
                            colspan:4,
                            width:400,
                            msgTarget:'side',
                            allowBlank:false,
                            anchor:'100%',
                            id:'imagen'
                    } ,               
                 
            {
                xtype:'label',
                text:'Los campos en (*) son OBLIGATORIOS',
                colspan:4,
                width:400

               }
                ],
                buttons:[{
                    text:'OK',
                    handler:function(){//ENVIAR DATOS
                      console.log('prueba');
                          //var FormularioEmpresas=this.up('form').getForm();
                          //console.log(FormularioEmpresas);
                                        if (this.up('form').getForm().isValid()) {
                                           //var post_nombreempresa=Ext.getCmp('empresa').getValue();
                                           //var post_imagen=Ext.getCmp('imagen').getValue();
                                                
                                           if(accion!=1){
                                            //console.log('prueba');
                      this.up('form').getForm().submit({
                                                    url:'procesos/guardar_empresa.php',
                                                    waitMsg:'Registrando la Empresa ',
                                                    success: function(fp, o) {
                                                         msg('Success', tpl.apply(o.result));
                                                        }

                                                    }); 
                                                   //storeEmpresas.load();                                          
                                   /*  Ext.Ajax.request({
                                                   url:'procesos/guardar_empresa.php?nombre='+post_nombreempresa+'&imagen='+post_imagen,
                                                   method:'POST',
                                                         success: function(result,request){
                                           
                                                                                        var jsonData=JSON.parse(result.responseText);
                                                                                       var bandera=jsonData[0].bandera;
                                                                                       var msj=jsonData[0].msg;
                                           
                                                                                  if (bandera==1) {
                                                                                               storeEmpresas.load();                                                                                               Ext.MessageBox.show({
                                                                                               title:'Exito',
                                                                                                msg:msj,
                                                                                                buttons:Ext.MessageBox.OK,
                                                                                                icon: Ext.MessageBox.INFO
                                                                                                });
                                                                                               }
                                           
                                                                                       if(bandera==2||bandera==3) { 
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
                                                                                           
                                                        } //fin de failure             
                                           
                                           
                                                   });*/                                               

                                                    }else{
                                                      var post_id=Ext.getCmp('idempresa').getValue();
                                                          Ext.Ajax.request({
                                                          url:'procesos/modificar_empresa.php?id='+post_id+'&nombre='+post_nombreempresa,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storeEmpresas.load();
                                                                                                          
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
                                                                                                      
                                                                   } //fin de failure         
                                                      
                                                      
                                                          });//fin de request
                                                      
                                                         

                                                    }


                                            this.up('form').getForm().reset();
                                            this.up('window').destroy();                                                     
                                            }else{
                                                 Ext.MessageBox.show({
                                                                               title:'Formulario incompleto',
                                                                               msg:'Existen campos sin llenar.',
                                                                               buttons:Ext.MessageBox.OK,
                                                                               icon: Ext.MessageBox.ERROR
                                                                               });
                                            }
                        
                                                                  


                                      }
                },{
                    text:'CANCELAR',
                    handler:function(){
                        this.up('form').getForm().reset();
                        this.up('window').destroy();
                    }
                }
                ]
            });

/**************************************************************************************/    
/*CREACION DE LA VENTANA EMERGENTE*/
        var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE DATOS DE LA EMPRESA',
                closable: false,
                width: 500,
                height: 250,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
         win.show();
        }


       
        









/*MODEL*/
Ext.define('Empresa', {
    extend: 'Ext.data.Model',
    fields: [
       {name:'idempresa',type:'int'},
       {name: 'empresa',type:'string'}
      
        ],
    idProperty: 'company'
});

/*CREO EL STORE*/
var storeEmpresas =  Ext.create('Ext.data.JsonStore', {
        model: 'Empresa',
        //autoload:true,
        proxy: {
            type: 'ajax',
            url: 'procesos/empresas_json.php',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });

/**************************************************************************************/    
storeEmpresas.load();
/**************************************************************************************/    


/**************************************************************************************/   

	/* SEL MODEL*/
	   var sm = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showContactForm(1);
                        form.getForm().loadRecord(record);
                    }
            }
        }
    });
/*CREO EL GRID*/


    var gridempresas = Ext.create('Ext.grid.Panel', {
        store: storeEmpresas,
		stateful: true,
        collapsible: false,
        selModel: sm,
        multiSelect: true,
        stateId: 'stateGrid',
        title:'Empresas',
        columns: [
          {
             text:'ID',
             width:50,
             hidden:true,
             sortable:true,
             dataIndex:'idempresa'
           },
           {
                text     : '<b>NOMBRE EMPRESA</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'empresa'
            }
            
        ],
        height: '100%',
        //width: '100%',
        width:'100%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
        tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: 'Agregar Empresa',
                id: 'buton12',
                 handler:function(){
                    showContactForm(0);
                } 
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: 'Borrar Empresa',
                id: 'buton13', 
                handler:function(){
                        Ext.MessageBox.confirm('Borrado', '¿Quiere borrar las empresas seleccionadas?', function(btn){
                            if(btn === 'yes'){
                                var selections = gridempresas.selModel.getSelection();
                                Ext.each(selections,function(record){
                                    id = record.get('idempresa');

                                    Ext.Ajax.request({
                                      url:'procesos/eliminar_empresa.php?id='+id,
                                      method:'POST',
                                      success:function(result,request){
                                          var jsonData=JSON.parse(result.responseText);
                                          var bandera=jsonData[0].bandera;
                                          var msj=jsonData[0].msg;

                                          if(bandera==1){
                                            storeEmpresas.load();
                                          }
                                            if(bandera==2){
                                                    Ext.MessageBox.show({
                                                                            title:'Sin Exito',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj                                              
                                          }
                                      }



                                    });

                                                                    
                                });
                            }
                            storeEmpresas.load();
                            
                        });
                } 
                
            },'-'
        ]
        
    });

 
/*CREACION DE LA INTERFAZ*/ 

		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionE',
        width: "100%",
		border: false,
		bodyStyle: 'background:#1C3E67;',
        bodyBorder: false,
		defaults: {
				anchor: '100%'
		},
        fieldDefaults: {
            labelWidth: 200,
			labelAlign:'right',
			bodyStyle: 'padding: 4px; background:#1C3E67;',
            msgTarget: 'side'
        },
        items: [
         {
         	xtype:'tabpanel',
				activeTab: 0,
				defaults:{
					bodyPadding: 10,
					layout: 'anchor'
				},
				items:[
					 {
						title:'GESTION DE EMPRESAS',
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
                        {          
                                    defaults: {
                                        frame:false,
                                        height: 25,
                                        border: true,
                                        style: 'margin: 0px 1px 0px 0px;'
                                    },  
                                    items:[
            							 	{
            									
            									height: 300,
            									items:[gridempresas]
            								}
                                            ]
                                        }
						      ]
					 }

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	







});//terminacion onReady










