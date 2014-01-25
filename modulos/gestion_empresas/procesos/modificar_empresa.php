<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.php");

$empresa=$_REQUEST["nombre"];
$idE=$_REQUEST["id"];
$objempresa=new empresa();

    if($objempresa!=null){//si se creo el objeto

			    	 if(!$objempresa->open_con())
			    {
			        		      
			    }
			    elseif ($objempresa->open_con()) 
							    {            
							     $estado=$objempresa->modificar_empresa($empresa,$idE);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizo la empresa.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe una empresa con ese nombre.');
								       	     break;

								        }
									    
							    	echo json_encode($data1);

							    }
		}


