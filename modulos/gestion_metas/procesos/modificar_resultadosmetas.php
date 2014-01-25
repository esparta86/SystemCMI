<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/resultadosmetas.php");
    

$idP=$_SESSION["idplan"];

$idResultado=$_REQUEST["idR"];
$aniometa=$_REQUEST["anio"];
$metaid=$_REQUEST["idmeta"];
$tr1=$_REQUEST["t1"];
$tr2=$_REQUEST["t2"];
$tr3=$_REQUEST["t3"];
$tr4=$_REQUEST["t4"];

$objResultadoMetas=new ResultadoMetas();
    if($objResultadoMetas!=null){
			    	 if(!$objResultadoMetas->open_con())
			    {  }
			    elseif ($objResultadoMetas->open_con()) 
							    {            
							    	//$verificar=$objResultadoMetas->verificarDobleAnio($aniometa,$metaid);
							    	  $verificar=false;
							          if(!$verificar){
										          $estado=$objResultadoMetas->modificarResultadoMeta($aniometa,$metaid,$tr1,$tr2,$tr3,$tr4,$idResultado);
											       switch ($estado) 
											       {
											       	case 1:
											       		 $data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico el resultado de meta.');
				     						       				
											       	case 2:
											       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
											       	     break;
											       	}
								          }else{
								          		 $data1[] = array('bandera'=>3,'msg'=>'No se permiten mas de un resultado por año');
								               }
							    	echo json_encode($data1);
							    }
		}
