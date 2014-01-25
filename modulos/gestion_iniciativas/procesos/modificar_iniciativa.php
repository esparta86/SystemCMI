<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/iniciativaestrategica.php");
    require_once("../../../recursos/class/unidades_involucradas.php");

$idP=$_SESSION["idplan"];
$corr=$_REQUEST["correlativo"];
$iniciativaText=$_REQUEST["iniciativa"];
$unidadid=$_REQUEST["idunidad"];
$involucradasid=json_decode(stripcslashes($_REQUEST["idinvolucradas"]),true);
$indicadorid=$_REQUEST["idindicador"];
$areaid=$_REQUEST["idarea"];
$idiniciativa=$_REQUEST["iniciativaid"];

$objiniciativaEstrategica=new iniciativaEstrategica();
    if($objiniciativaEstrategica!=null){
			    	 if(!$objiniciativaEstrategica->open_con())
			    {  }
			    elseif ($objiniciativaEstrategica->open_con()) 
							    {            
							    $estado=$objiniciativaEstrategica->modificar_iniciativaE($areaid,$unidadid,$corr,$iniciativaText,$idiniciativa);
								       switch ($estado) {
								       	case 1:
								       		  $objunidadesInvolucradas=new unidadesInvolucradas();
	     						       		  $estado2=$objunidadesInvolucradas->actualizarUnidadesInvolucradas($involucradasid,$idiniciativa);
	     						       		      switch ($estado2) 
	     						       		      {
	     						       		      	case 1:
	     						       						$data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico iniciativa Estrategica.');
	     						       					break;
	     						       		      	case 2:
	     						       		      			$data1[] = array('bandera'=>1,'msg'=>'Exito,Se agrego iniciativa Estrategica, pero las unidad involucradas no se registraron.');
	     						       		      		break;
	     						       		        case 3:
	     						       		             $data1[] = array('bandera'=>1,'msg'=>'Exito,Se agrego iniciativa Estrategica, pero hubo un problema con las unidades, contacte con el administrador del sistema.');
	     						       		             break;
	     						       		      }
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un objetivo de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
