<?php
session_start();
if(isset($_SESSION["id_usuario"]))
{
	
	
	$id_usuario=$_SESSION["id_usuario"];
    $nombreUsuario=$_SESSION["nombreUsuario"];
    $tipo_usuario=$_SESSION["tipousuario"];
    $idempresa=$_SESSION["idempresa"];
    $idplan=$_SESSION["idplan"];
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
Ext.ns('form_reportes');

form_reportes.Panel = 
{
	init: function()
	{
            Ext.form.Field.prototype.msgTarget='side';
     
            
            var form_login = new Ext.FormPanel
            ({
                id          :   'id_form_login',
                labelAlign  :   'top',
                autoHeight  :   true,
                autoScroll  :   true,
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
                    	height:500,
                    	autoLoad:'procesos_login/panelReportes.php',	
						                    	
                    }
                    

                ]
            });
            var main = new Ext.Panel
            ({
                    title: 'Reportes del sistema online sistema de gestion de planes estrategicos. ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[form_login],
                    renderTo:'contenido-principal',
                    width:'95%',
                    bbar:[{text:'<center><b><font size="2">AVANCE Y DESEMPE&Ntilde;O S.A. de C.V </font></b><b><font size="1"> &copy; DERECHOS RESERVADOS '+ new Date().getFullYear()+'</font></b></center>'}]
            });


                   var Plogout=new Ext.FormPanel({
					id:'idlogout',
					height:50,
					width:100,
					//renderTo:'logout',

					items:[
					{
						xtype:'button',
						text:'<b>Cerrar Session</b>',
						scale:'large',
						width:100
					}
					]

				});

	}
};


Ext.onReady(form_reportes.Panel.init,form_reportes.Panel);
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