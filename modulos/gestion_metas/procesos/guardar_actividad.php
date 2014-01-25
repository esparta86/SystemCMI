<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/metaoperativa.php");
    

$idP=$_SESSION["idplan"];

$Activid=$_REQUEST["actividad"];
$Result=$_REQUEST["resultado"];
$MedioV=$_REQUEST["medio"];
$RecursoF=$_REQUEST["financiero"];
$idcargo=$_REQUEST["cargo"];
$observacionA=$_REQUEST["observacion"];
$fechaI=$_REQUEST["fechai"];
$fechaF=$_REQUEST["fechaf"];
$idiniciativa=$_REQUEST["iniciativaid"];
$objMetaOperativa=new MetaOperativa();
    if($objMetaOperativa!=null){
			    	 if(!$objMetaOperativa->open_con())
			    {  }
			    elseif ($objMetaOperativa->open_con()) 
							    {            
							    $estado=$objMetaOperativa->guardar_actividad($Activid,$Result,$MedioV,$RecursoF,$idcargo,$observacionA,$fechaI,$fechaF,$idiniciativa);
								       switch ($estado) {
								       	case 1:
								       		 $data1[] = array('bandera'=>1,'msg'=>'Exito,Se agrego la actividad.');
	     						       				
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe una actividad de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
