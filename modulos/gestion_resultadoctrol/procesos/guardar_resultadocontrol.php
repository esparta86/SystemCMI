<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/resultadosindicador.php");
   

$idP=$_SESSION["idplan"];

$controlId=$_REQUEST["idcontrol"];
$resultados=json_decode(stripcslashes($_REQUEST["resultadosControl"]),true);

$objResultadosIndicador=new ResultadosIndicador();
    if($objResultadosIndicador!=null){
			    	 if(!$objResultadosIndicador->open_con())
			    {  }
			    elseif ($objResultadosIndicador->open_con()) 
							    {            
							    $estado=$objResultadosIndicador->guardar_resultadosIndicador($controlId,$resultados);
								       switch ($estado) {
								       	case 1:
								       		 $data1[] = array('bandera'=>1,'msg'=>'Exito,Se registraron los resultados.');
	     						       		 break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>' .');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
