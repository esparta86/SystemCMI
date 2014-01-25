<?php
session_start();
if(isset($_SESSION["id_usuario"]))
{
	
	$id_usuario=$_SESSION["id_usuario"];
    $nombreUsuario=$_SESSION["nombreUsuario"];
    $tipo_usuario=$_SESSION["tipousuario"];
    $idempresa=$_SESSION["idempresa"];
    $empresa=$_SESSION["empresa"];
    $imageempresa="../recursos/img/empresas/".$_SESSION["imagen"];

?>
<html>
 <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="../recursos/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="../recursos/resources/css/style.css" />
    <link rel="stylesheet" type="text/css" href="../recursos/resources/css/ext-all-neptune.css" />

    <script type="text/javascript" src="../recursos/js/ext-all.js"></script>
    <script type="text/javascript" src="../recursos/js/ext-theme-neptune.js"></script>
 
	<script>
	//the namespace
Ext.ns('menu_empresa');

menu_empresa.Panel = 
{
	init: function()
	{
            Ext.form.Field.prototype.msgTarget='side';
     
           /**model**/
       Ext.define('planesModel',{
			  extend:'Ext.data.Model',
			  fields:[
			   {name:'idplan',type:'int'},
			   {name:'periodo',type:'string'},
			   {name:'anio',type:'string'},
			   {name:'estado',type:'string'},
			   {name:'mes',type:'string'}			   
			  ],
			  idProperty:'company'
			});           
       /** stores */

       var storePlanes=Ext.create('Ext.data.JsonStore',{
          model:'planesModel',
          proxy:{
                type:'ajax',
                url:'procesos/procesos/planes_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
        });


var smPlanes=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            		if(record!=undefined){
                     var id=record.get('idplan');
                 
 							Ext.Ajax.request({
                                            url:'procesos/procesos/set_plan.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                      Ext.MessageBox.show
                                                                        ({
                                                                           msg: 'REDIRECCIONANDO...',
                                                                           width:300,
                                                                           wait:true,
                                                                           waitConfig: {interval:300},
                                                                           icon:'security'
                                                                        });  

                                                                        location.href='menuEmpresa2.php';                                              

                                            }//fin del success
                                        });                 
                        }
                    
                    
                    }
               }
               }); //fin del sm

var gridPlanes=Ext.create('Ext.grid.Panel',{
 	store:storePlanes,
 	stateful:true,
 	collapsible:false,
 	selModel:smPlanes,
 	multiSelect:false,
 	stateId:'stateGrid',
 	 	columns:[
        {
          text:'ID_PLAN',
          sortable:false,
          dataIndex:'idplan',
          hidden:true
        },
        {
          text:'PERIODO',
          sortable:false,
          dataIndex:'periodo',
          flex:1
        }        
        ,
        {
 			text:'<b>AÑO ACTUAL</b>',
 			sortable:true,
 			flex:1,
      dataIndex:'anio'
 		   }
       ,
 		
 		{
 			text:'<b>ESTADO</b>',
 			sortable:true,
 			flex:1,
 			dataIndex:'estado'
 		},
    {
      text:'<b>MES</b>',
      sortable:true,
      flex:1,
      dataIndex:'mes'
    }
    
   
        ]


 	});


            var form_login = new Ext.FormPanel
            ({
                id          :   'id_form_login',
                labelAlign  :   'top',
                autoHeight  :   true,
                autoScroll  :   false,
                border      :   true,
                bodyStyle   :   'padding: 10px 20px 30px 10px;',
                frame        :true,
                layout:{
                	 type:'column',
                	 
		                	 tdAttrs:{
		                valign:'middle'
		               }
                },
                items: 
                [
                    {
                    	xtype:'panel',
                    	width:'100%',
                    	border:false,
                    	height:250,
                    	items:[
                    		gridPlanes
                    	]
                    
						                    	
                    }
                    

                ]
            });

           

            var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE PLAN[PLANES DE TRABAJO VIGENTE Y PROYECTADOS]' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[gridPlanes],
                    renderTo:'contenido-principal',
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
                storePlanes.load();


	}
};


Ext.onReady(menu_empresa.Panel.init,menu_empresa.Panel);
	</script>
 </head>
 <body>
	<table width="100%" border="0">
		<tr>
			<td>
				<b>Bienvenido  </b>  <?php echo $nombreUsuario?>
        <b>,<?php echo $empresa?></b>
			</td>
			<td>
				
        <img src="<?php echo $imageempresa; ?>" height="69">
			
			</td>
			<td align="right">
				<a href="procesos_login/cerrar_sesion.php" title="Cerrar Sesion"><img src="../recursos/img/logou.png" width="50" height="50">Cerrar Sesion</a>
				</td>
		</tr>
		<tr>
			<td align="center" colspan="3">				
				<div id="contenido-principal" >
				</div>
			</td>
		</tr>
	</table>
 </body>
</html>
<?php
}else{
  header("Location:http://localhost/CMI/");
    exit();
}
?>