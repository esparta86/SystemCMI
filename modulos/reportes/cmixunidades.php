<?php
session_start();
if(isset($_SESSION["id_usuario"]))
{

$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];
$tipo_usuario=$_SESSION["tipousuario"];
$idempresa=$_SESSION["idempresa"];
$empresa=$_SESSION["empresa"];
$imageempresa="../../recursos/img/empresas/".$_SESSION["imagen"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

// HTTP/1.0 
header("Pragma: no-cache");
?>
<html>
<head>
<title>CMI por Unidades </title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/style.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all-neptune.css" />

<script type="text/javascript" src="../../recursos/js/ext-all.js"></script>
<script type="text/javascript" src="../../recursos/js/ext-theme-neptune.js"></script>

<script type="text/javascript" src="js/interfazCmixUnidad.js"></script>
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


.icon-reporte{
background-image: url('../../recursos/img/report.png');
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
    <table width="100%" border="0">
        <tr>
            <td>
                <b>Bienvenido  </b>  <?php echo $nombreUsuario?>
                <b>,<?php echo $empresa?></b>
                <center>
                <img src="<?php echo $imageempresa; ?>" height="69">
                </center>                                 

            </td>
            <td>
               
            </td>
            
        </tr>
        <tr>
            <td align="center" colspan="2">             
                <div id="contenido-cmiperspectivas" >
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