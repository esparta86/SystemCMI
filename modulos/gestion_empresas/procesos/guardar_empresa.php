<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.php");


$body = file_get_contents("php://input");
$content_type = false;
if(isset($_SERVER['CONTENT_TYPE'])) {
			            $content_type = $_SERVER['CONTENT_TYPE'];
			}
$directorio = '../../../recursos/img/empresas/';
		
		if (move_uploaded_file($_FILES['imagen']['tmp_name'], $directorio . $_FILES['imagen']['name']))
			{
			    $img=$_FILES['imagen']['name'];
			}
			else
			{
			    $data1[] = array('success'=>false,'msg'=>'NO se subio el archivo!');
			}
$empresa=$_REQUEST["nombre"];
$objempresa=new empresa();

    if($objempresa!=null){//si se creo el objeto

			    	 if(!$objempresa->open_con())
			    {
			        		      
			    }
			    elseif ($objempresa->open_con()) 
							    {            
							     $estado=$objempresa->guardar_empresa($empresa,$img);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el nuevo empleado.');  
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


