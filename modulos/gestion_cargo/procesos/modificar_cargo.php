<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.php");


$idunidad=$_REQUEST["unidadId"];
$nombreCargo=$_REQUEST["cargo"];
$idcargo=$_REQUEST["cargoid"];


$objCargo=new Cargo();
    if($objCargo!=null){
			    	 if(!$objCargo->open_con())
			    {  }
			    else
			    	if ($objCargo->open_con()) 
							    {            
							     $estado=$objCargo->modificar_cargo($nombreCargo,$idunidad,$idcargo);
								         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se agrego nuevo Cargo ');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un cargo de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
