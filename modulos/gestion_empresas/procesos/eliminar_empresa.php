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
							     $estado=$objempresa->eliminar_empresa($idE);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la empresa.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se elimino ! intente de nuevo.');
								       	    break;
								          }
									    
							    	echo json_encode($data1);

							    }
		}


