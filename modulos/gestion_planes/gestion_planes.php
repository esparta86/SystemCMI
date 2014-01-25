<?php
session_start();
if(isset($_SESSION["id_usuario"]))
{
$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];
$tipo_usuario=$_SESSION["tipousuario"];
$idempresa=$_SESSION["idempresa"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

?>
<html>
<head>
<title>Gestion de Planes Estrategicos</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/style.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all-neptune.css" />

<script type="text/javascript" src="../../recursos/js/ext-all.js"></script>
<script type="text/javascript" src="../../recursos/js/ext-theme-neptune.js"></script>

<script type="text/javascript" src="js/interfazPlanes.js"></script>
<style type="text/css">

.icon-userconfig {
background-image: url('../../recursos/img/group_gear.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}

.icon-datos {
background-image: url('../../recursos/img/database_lightning.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}

.icon-plan_add {
background-image: url('../../recursos/img/add.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}



.icon-plan_delete{
background-image: url('../../recursos/img/delete.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-OK{
background-image: url('../../recursos/img/accept.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-CANCEL{
background-image: url('../../recursos/img/cancel.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}
</style>




</head>

<body>
<p style="font-size:20px;
background-color:#DFE9F6;
color:#0000FF;"> BIENVENIDO : <b><?php echo $nombreUsuario; ?> </b>
<br>
</p>
<div>
		
		<p><CENTER> <FONT STYLE="color:#0000FF;font-size:24px;"><B>ADMINISTRACION DE LOS PLANES ESTRATEGICOS POR EMPRESA</B></FONT></CENTER></p>
		<br>
		
		
		
</div>
<br>
	<center><div id="interfazGestionPlanes">

	</div></center>


	
</body>
</html>
<?php
}else{
    header("Location:http://localhost/CMI/");
    exit();
}
?>