<?php
class ConsultaReportes extends DBManager
{
	var  $con;
    function open_con()
    {
    	$this->con=parent::conectar();
	return $this->con;
    }
    function close_con()
    {
	parent::desconectar();
    }
/***************************************************************************************************************************************************/
/*      FUNCIONES QUE AYUDAN A CONSTRUIR EL REPORTE DE CMI POR UNIDADES EN FORMATO ARRAY PARA LUEGO GENERAR UN EXCEL
/***************************************************************************************************************************************************/


/*
* funcion que construye el array para generar cmi (Perspectivas, objetivos,indicadores, iniciativas y metas operativas)
* 2. Recupera las perspectivas
* 1. Recupera los Objetivos e indicadores 
* 2. Recupera los controles y metas de un indicador.
* 3. Recupera las iniciativas y metas operativas
*/
function ReporteCmixUnidades($idUnidad,$idplan)
{
parent::conectar();
$perspectivas=$this->getPerspectivasxUnidad($idUnidad);
$finalReporte=array();
if(is_array($perspectivas))
{
  foreach ($perspectivas as $key => $perspectiva) 
  {
    $idperspectiva=$perspectiva[0];
    $nombreP=$perspectiva[1];
    $InfoGral=$this->getInfoObjetivosIndicadores($idperspectiva); /*1. Recupera los Objetivos e indicadores*/
    foreach ($InfoGral as $key => $fila) 
    {
     $idIndicador=$fila[2];
     $infoIndicador=array($nombreP,$fila[1],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8]);
     $controles=$this->getControlesMetasExcel($idIndicador,$idplan);/*2. Recupera los controles y metas de un indicador.*/
     $ArrayIniciativasMetas=$this->getIniciativasMetas($idIndicador);/* 3. Recupera las iniciativas y metas operativas*/
        if(is_array($ArrayIniciativasMetas))
        {
          foreach ($ArrayIniciativasMetas as $key => $iniciativa) 
                 {
                      $idmeta=$iniciativa[1];
                      $infoIniciativa=array($iniciativa[2],$iniciativa[3],$iniciativa[4],$iniciativa[5],$iniciativa[6],$iniciativa[7],$iniciativa[8]);
                      $infoIniciativaUltimo=array($iniciativa[9],$iniciativa[10],$iniciativa[11]);/*fechas y observaciones*/
                      $resultadosMetas=$this->getResultadosMetas($idmeta,$idplan);
                      $resultxIndicador=array_merge($infoIndicador,$controles,$infoIniciativa,$resultadosMetas,$infoIniciativaUltimo);
                      array_push($finalReporte,$resultxIndicador);
                  }             
        }else{
                $resultxIndicador=array_merge($infoIndicador,$controles);
                array_push($finalReporte,$resultxIndicador);
             }
    }  

  }/*fin de foreach perspectivas*/
}else{
  $finalReporte[]=array("La unidad organizativa no posee perspectivas");
}
 return $finalReporte;
}/*fin de funcion*/



/*
* funcion que recupera las perspectivas de una unidad organizativa responsable a partir del idunidad
*/

function getPerspectivasxUnidad($idUnidad)
{
parent::conectar();
$sql="SELECT DISTINCT(perspectiva.IDPERPECTIVA),CONCAT(NOMBREPERSPECTIVA,': ',DESCRIPCIONPERSPECTIVA) AS NOMBREP 
FROM iniciativaestrategica 
INNER JOIN indicador ON(iniciativaestrategica.IDINDICADOR=indicador.IDINDICADOR)
INNER JOIN objetivoestrategico ON(objetivoestrategico.IDOBJ=indicador.IDOBJ)
INNER JOIN perspectiva ON(objetivoestrategico.IDPERPECTIVA=perspectiva.IDPERPECTIVA)
WHERE IDUNIDAD=$idUnidad 
ORDER BY perspectiva.IDPERPECTIVA";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else{
      while (!$record_consulta->EOF) 
      {
        $data[]=array($record_consulta->fields["IDPERPECTIVA"],$record_consulta->fields["NOMBREP"]);
        $record_consulta->MoveNext();  
      }
      return $data;
  }
}/*fin de funcion*/



/***************************************************************************************************************************************************/
/*      FUNCIONES QUE AYUDAN A CONSTRUIR EL REPORTE EN FORMATO ARRAY PARA LUEGO GENERAR UN EXCEL
/***************************************************************************************************************************************************/
function EncabezadoExcelUnidades(){
parent::conectar();
return array('Perspectiva ','Objetivo Estrategico','Indicador','Formula de medicion','U. de medida','periodo','Direccion','linea base');
}


function EncabezadoExcel(){
parent::conectar();
return array('Objetivo Estrategico','Indicador','Formula de medicion','U. de medida','periodo','Direccion','linea base');
}

function EncabezadoExcelIniciativasYoperativas(){
parent::conectar();
return array('Iniciativa','Area responsable','Actividad','Cargo responsable','Resultado esperado','Medio de verificacion','Recursos Financieros');
}

function EncabezadoExcelUltimo(){
  parent::conectar();
  return array('Fecha Inicio','Fecha Fin','Observaciones');
}



function ReporteCmiPerspectivasExcel($idperspectiva,$idplan)
{
parent::conectar();
$Info=$this->getInfoObjetivosIndicadores($idperspectiva);

$finalReporte=array();
foreach ($Info as $key => $fila) 
  {
    $idIndicador=$fila[2];  
    $infoIndicador=array($fila[1],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8]);
    $controles=$this->getControlesMetasExcel($idIndicador,$idplan);
    $resultxIndicador=array_merge($infoIndicador,$controles);
    array_push($finalReporte,$resultxIndicador);
  }
 return $finalReporte;
}/*fin de funcion*/


/*
* funcion que construye el array para generar cmi (objetivos,indicadores, iniciativas y metas operativas)
* 1. Recupera los Objetivos e indicadores 
* 2. Recupera los controles y metas de un indicador.
* 3. Recupera las iniciativas y metas operativas
*/
function ReporteCmiperspectivasMetas($idperspectiva,$idplan)
{
parent::conectar();
$InfoGral=$this->getInfoObjetivosIndicadores($idperspectiva); /*1. Recupera los Objetivos e indicadores*/
$finalReporte=array();
foreach ($InfoGral as $key => $fila) 
  {
    $idIndicador=$fila[2];  
    $infoIndicador=array($fila[1],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8]);
    $controles=$this->getControlesMetasExcel($idIndicador,$idplan);/*2. Recupera los controles y metas de un indicador.*/
    $ArrayIniciativasMetas=$this->getIniciativasMetas($idIndicador);/* 3. Recupera las iniciativas y metas operativas*/
      if(is_array($ArrayIniciativasMetas))
    {
      foreach ($ArrayIniciativasMetas as $key => $iniciativa) 
       {
            $idmeta=$iniciativa[1];
            $infoIniciativa=array($iniciativa[2],$iniciativa[3],$iniciativa[4],$iniciativa[5],$iniciativa[6],$iniciativa[7],$iniciativa[8]);
            $infoIniciativaUltimo=array($iniciativa[9],$iniciativa[10],$iniciativa[11]);/*fechas y observaciones*/
            $resultadosMetas=$this->getResultadosMetas($idmeta,$idplan);
            $resultxIndicador=array_merge($infoIndicador,$controles,$infoIniciativa,$resultadosMetas,$infoIniciativaUltimo);
            array_push($finalReporte,$resultxIndicador);
            
       }
    }else
    {/*no posee iniciativas con metas*/
      $resultxIndicador=array_merge($infoIndicador,$controles);
      array_push($finalReporte,$resultxIndicador);
    }
     
 }
  return $finalReporte;
  
  
}/*fin de funcion*/

/*
* funcion que recupera las iniciativas estrategicas y metas operativas a partir de indicador
* 
*/

function getIniciativasMetas($idIndicador){
  parent::conectar();
  $sql="SELECT 
iniciativaestrategica.IDINICIATIVA,
metaoperativa.IDMETA,
NOMBREINICIATIVA,
(SELECT NOMBREAREA FROM areas WHERE IDAREA=iniciativaestrategica.IDAREA) AS AREARESPONSABLE,
ACTIVIDAD,
(SELECT NOMBRECARGO FROM cargo WHERE IDCARGO=metaoperativa.IDCARGO) AS CARGORESPONSABLE,
RESULTADO,
MEDIOVERIFICACION,
RECURSOFINANCIERO,
FECHAI,
FECHAF,
OBSERVACION
FROM iniciativaestrategica 
INNER JOIN metaoperativa ON(iniciativaestrategica.IDINICIATIVA=metaoperativa.IDINICIATIVA)
WHERE IDINDICADOR=$idIndicador";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
     $a[]=array("","","","","","","","","","","","");
     return $a; 
  }else{
      while(!$record_consulta->EOF)
      {
        $idIniciativa=$record_consulta->fields["IDINICIATIVA"];
        $metaId=$record_consulta->fields["IDMETA"];
        $nombreIniciativa=$record_consulta->fields["NOMBREINICIATIVA"];
        $areaR=$record_consulta->fields["AREARESPONSABLE"];
        $meta=$record_consulta->fields["ACTIVIDAD"];
        $cargoR=$record_consulta->fields["CARGORESPONSABLE"];
        $result=$record_consulta->fields["RESULTADO"];
        $medioV=$record_consulta->fields["MEDIOVERIFICACION"];
        $recursoF=$record_consulta->fields["RECURSOFINANCIERO"];
        $fechaI=$record_consulta->fields["FECHAI"];
        $fechaF=$record_consulta->fields["FECHAF"];
        $observacion=$record_consulta->fields["OBSERVACION"];
        $DATOS[]=array($idIniciativa,$metaId,$nombreIniciativa,$areaR,$meta,$cargoR,$result,$medioV,$recursoF,$fechaI,$fechaF,$observacion);
        $record_consulta->MoveNext();
      }
      return $DATOS;
  }


}/*fin de funcion*/


/*
* funcion que regresa el nomrbre de la perspectiva
*/
function getNombrePerspectiva($idperspectiva){
parent::conectar();
$sql="SELECT CONCAT(NOMBREPERSPECTIVA,': ',DESCRIPCIONPERSPECTIVA) AS P FROM perspectiva WHERE IDPERPECTIVA=$idperspectiva";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
      return " ";
  }else
  {
      while (!$record_consulta->EOF) 
      {
         $nombre=$record_consulta->fields["P"];
         $record_consulta->MoveNext();
      }
      return $nombre;
  }
}/*fin de funcion*/

/***************************************************************************************************************************************************/
/*      FUNCIONES QUE AYUDAN A CONSTRUIR EL REPORTE EN FORMATO HTML
/***************************************************************************************************************************************************/
/*
* funcion que tienen como objetivo construir el reporte en un formato html
*/
function ReporteCmiPerspectivas($idperspectiva,$idplan){
parent::conectar();
$Info=$this->getInfoObjetivosIndicadores($idperspectiva);
$finalReporte=array();
foreach ($Info as $key => $fila) 
  {
    $idIndicador=$fila[2];  
    $infoIndicador=array($fila[0],$fila[1],$fila[2],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8]);
    $controles=$this->getControlesMetas($idIndicador,$idplan);
    $resultxIndicador=array_merge($infoIndicador,$controles);
    array_push($finalReporte,$resultxIndicador);
  }
  $ReporteFinal=$this->construirReporteCmixperpectiva($finalReporte,$idplan);

  return $ReporteFinal;
}/*fin de funcion*/


/*
* funcion que tienen como objetivo construir el reporte en un formato html para el cmi por perspectivas
*/
function ReporteCmiPerspectivasMetasHTML($idperspectiva,$idplan){
parent::conectar();
$Info=$this->getInfoObjetivosIndicadores($idperspectiva);
$finalReporte=array();
foreach ($Info as $key => $fila) 
  {
    $idIndicador=$fila[2];  
    $infoIndicador=array($fila[1],$fila[3],$fila[4],$fila[5],$fila[6],$fila[7],$fila[8]);
    $controles=$this->getControlesMetasExcel($idIndicador,$idplan);
    $ArrayIniciativasMetas=$this->getIniciativasMetas($idIndicador);/* 3. Recupera las iniciativas y metas operativas*/
     if(is_array($ArrayIniciativasMetas))
     {
        foreach ($ArrayIniciativasMetas as $key => $iniciativa) 
       {
            $idmeta=$iniciativa[1];
            $infoIniciativa=array($iniciativa[2],$iniciativa[3],$iniciativa[4],$iniciativa[5],$iniciativa[6],$iniciativa[7],$iniciativa[8]);
            $infoIniciativaUltimo=array($iniciativa[9],$iniciativa[10],$iniciativa[11]);/*fechas y observaciones*/
            $resultadosMetas=$this->getResultadosMetas($idmeta,$idplan);
            $resultxIndicador=array_merge($infoIndicador,$controles,$infoIniciativa,$resultadosMetas,$infoIniciativaUltimo);
            array_push($finalReporte,$resultxIndicador);
            
       }

     }else{
          $resultxIndicador=array_merge($infoIndicador,$controles);
           array_push($finalReporte,$resultxIndicador);
   
     }

  }
  $ReporteFinal=$this->construirReporteCmixperpectivaGral($finalReporte,$idplan);
  //return $ReporteFinal;
}/*fin de funcion*/




/*
* funcion que tien como objetivo construir el reporte en html
*  integrando 
*   Encabezado->Cuerpo
*/
function construirReporteCmixperpectiva($Reporte,$idplan){
parent::conectar();
$Encabezado=$this->Encabezado($idplan);
$cuerpo=$this->Cuerpo($Reporte,$idplan);
$Reporte=$Encabezado."".$cuerpo."</table>";

return $Reporte;
}/* fin de funcion*/



/*
* funcion que tien como objetivo construir el reporte en html
*  integrando 
*   Encabezado->Cuerpo
*/
function construirReporteCmixperpectivaGral($Reporte,$idplan){
parent::conectar();
$Encabezado=$this->EncabezadoCmiGral($idplan);
$cuerpo=$this->CuerpoCMIGral($Reporte,$idplan);
echo $Encabezado;
echo $cuerpo;
//$Reporte=$Encabezado."</table>";//."".$cuerpo."</table>";
//return $Reporte;
}/* fin de funcion*/



/*
* funcion que construye el cuerpo del reporte en html del cmi gral
*/
function CuerpoCMIGral($Reporte,$idplan)
{
parent::conectar();
$cuerpoHtml="";    
      foreach ($Reporte as $key => $fila) {
        $cuerpoHtml=$cuerpoHtml."<tr>";
            foreach ($fila as $key => $dato) {
                      $cuerpoHtml=$cuerpoHtml."<td>".$dato."</td>";
                     }
        $cuerpoHtml=$cuerpoHtml."</tr>";
        }
//print_r($cuerpoHtml);
 return $cuerpoHtml;
}/*fin de funcion*/











/*
* funcion que construye el cuerpo del reporte en html
*/
function Cuerpo($Reporte,$idplan)
{
parent::conectar();
$cuerpoHtml="";
    

    $f=0;
      foreach ($Reporte as $key => $fila) {
      
      $idobjetivo=$fila[0];
      $idIndicador=$fila[2];
      $color=$this->ProcesarIndicador($idIndicador);

      $cuerpoHtml=$cuerpoHtml."<tr>";

                    $sumaRows=0;
                    foreach ($Reporte as $ky => $v) {
                          $idobjetivo2=$v[0];
                          if($idobjetivo==$idobjetivo2){
                            $sumaRows++;
                          }
                    }

            if($f==0)
            {/*primera iteracion*/
               $cuerpoHtml=$cuerpoHtml."<td width='200'>".$fila[1]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[3]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[4]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td><center>".$fila[5]."</center></td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[6]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td><center>".$fila[7]."</center></td>";
               $cuerpoHtml=$cuerpoHtml."<td>$fila[8]</td>";  
               $controles=$this->getControlesMetasHTML($idIndicador,$idplan);
               $cuerpoHtml=$cuerpoHtml."".$controles;
               $cuerpoHtml=$cuerpoHtml."<td style='background-color:$color;'> </td>";

            }else
               {
                    if($idobjetivo==$idobjetivoAnterior)
                    {
                     //$cuerpoHtml=$cuerpoHtml."<td></td>"; 
                    }else{
                        
                    }
               $cuerpoHtml=$cuerpoHtml."<td width='200'> ".$fila[1]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[3]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[4]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td><center>".$fila[5]."</center></td>";
               $cuerpoHtml=$cuerpoHtml."<td>".$fila[6]."</td>";
               $cuerpoHtml=$cuerpoHtml."<td><center>".$fila[7]."</center></td>";
               $cuerpoHtml=$cuerpoHtml."<td>$fila[8]</td>";  
               $controles=$this->getControlesMetasHTML($idIndicador,$idplan);
               $cuerpoHtml=$cuerpoHtml."".$controles;
               $cuerpoHtml=$cuerpoHtml."<td style='background-color:$color;'> </td>";

              }

              $f++;
              $idobjetivoAnterior=$idobjetivo;  
              $cuerpoHtml=$cuerpoHtml."<tr>";    
    }
  
 //exit();
 return $cuerpoHtml;
}/*fin de funcion*/


/*
* funcion que procesa un indicador y recupera el color segun la comparacion de los resultados contra los controles y metas
*/
function ProcesarIndicador($idIndicador){
parent::conectar();
  $anio=date("Y");
  $color="#7f7979";
  //$anioProcesado=$anio-1;
  $data=$this->getControlMetaAnio($idIndicador,$anio);
  if($data[0]!=0)
  {
    $idcontrol=$data[0];
    $limiteControl=$data[1];
    $meta=$data[2];
    if(is_numeric($limiteControl)&&is_numeric($meta))
    {
      $tipoC=$this->get_tipoCalculo($idIndicador);
      if ($tipoC!=0) 
         {
         $color=$this->get_color($anio,$idcontrol,$tipoC,$limiteControl,$meta);
         }
    }
    
  }
  return $color;
 
}/*fin de funcion */


/*
* funcion que determina el color
* @anio año del control y meta
* @idcontrol  id del control
* @tipoC tipo de calculo
* @limiteControl  limite de control de ese año
* @meta meta de ese año
*/
function get_color($anio,$idControl,$tipoC,$limiteControl,$meta)
{
  $color="";
  if($tipoC==1)
  {//obtener por promedio
     $resultado=$this->calculoPromedio($idControl);
  }
  if($tipoC==2)
  {//obtener por suma
    $resultado=$this->calculoSuma($idControl);
  }
  if($resultado>=$limiteControl && $resultado<$meta){ $color="#fff726"; }
    if($resultado<$limiteControl){ $color="#ff0000"; }
      if($resultado>=$meta) { $color="#00c93c"; }
             
  return $color;
}/*fin de funcion*/


/*
* funcion que obtiene el resultado por promedio
*/
function calculoPromedio($idControl){
$sql="SELECT IFNULL(AVG(RESULTADOCTROL),0) AS PROMEDIO FROM resultadosindicador WHERE IDCONTROL=$idControl";
$record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0)
 {
     return 0;
 }else
 {
     while (!$record_consulta->EOF) 
           {
           $prom=$record_consulta->fields["PROMEDIO"];
           $record_consulta->MoveNext();
           }
           return $prom;
  }
}




/*
* funcion que obtiene el resultado por suma
*/
function calculoSuma($idControl){
$sql="SELECT IFNULL(SUM(RESULTADOCTROL),0) AS SUMA FROM resultadosindicador WHERE IDCONTROL=$idControl";
$record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0)
 {
     return 0;
 }else
 {
     while (!$record_consulta->EOF) 
           {
           $sum=$record_consulta->fields["SUMA"];
           $record_consulta->MoveNext();
           }
           return $sum;
  }
}



/*
* funcion que obtiene el tipo de calculo del indicador
* 1- promedio    , 2- suma
*/
function get_tipoCalculo($idIndicador){
  parent::conectar();
  $sql="SELECT CALCULO FROM indicador WHERE IDINDICADOR=$idIndicador";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0)
   {
     return 0;
   }else{
      while (!$record_consulta->EOF) 
      {
          $tipoC=$record_consulta->fields["CALCULO"];
          $record_consulta->MoveNext();
      }
      return $tipoC;
   }
}

/*
* funcion cuyo objetivo es extraer el control y meta de un año especifico de un indicador
*/
function getControlMetaAnio($idIndicador,$anio){
parent::conectar();
/* funciona quitando el % donde si tienen */
   $sql="SELECT IDCONTROL,TRIM(TRAILING '%' FROM LIMITECTROL) AS LIMITECTROL ,TRIM(TRAILING '%' FROM META) AS META FROM control WHERE IDINDICADOR=$idIndicador AND ANIO=$anio";
   $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0)
   {
      $data[]=0;
      $data[]=0;
      $data[]=0;
      return $data;
   }else{
        while (!$record_consulta->EOF) 
        {
      $data[]=$record_consulta->fields["IDCONTROL"];
      $data[]=$record_consulta->fields["LIMITECTROL"];
      $data[]=$record_consulta->fields["META"];
      $record_consulta->MoveNext();
          
        }
        return $data;
   }

}/* fin de funcion */



/*
* funcion que construye el encabezado html de cmi por perspectivas
*/
function Encabezado($idplan){
parent::conectar();
$stringReporte="<table width='170%' border='1' style='font-family:'Trebuchet MS', Arial, Helvetica, sans-serif;width:100%; border-collapse:collapse;'>
<tr>
    <td width='200' rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Objetivo Estrategico<b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Indicador</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Formula de medicion</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>U. medida</center></td>
    <th rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>periodo</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Direccion</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><b>Linea.Base</b></td>";
$anios=$this->get_anios($idplan);
$stringAnios="";
foreach ($anios as $key => $anio) 
{
  $stringAnios=$stringAnios."<td colspan='2' width='100' style='background-color:#A7C942;color:#ffffff;'><center>".$anio."</center></td>";
}
$stringReporte=$stringReporte."".$stringAnios."</tr>";
$stringContro="<tr>";
foreach ($anios as $key => $anio) 
{
  $stringContro=$stringContro."<td width='100' style='background-color:#A7C942;color:#ffffff;'><center>Control</center></td><td width='100' style='background-color:#A7C942;color:#ffffff;'><center>Meta</center></td>";
}
$stringReporte=$stringReporte."".$stringContro."<td width='100' style='background-color:#A7C942;color:#ffffff;'><center>Avance</center></td></tr>";
return $stringReporte;
}



/*
* funcion que construye el encabezado html de cmi por perspectivas incluye iniciativas y metas operativas
*/
function EncabezadoCmiGral($idplan){
parent::conectar();
$stringReporte="<table width='170%' border='1' style='font-family:'Trebuchet MS', Arial, Helvetica, sans-serif;width:100%; border-collapse:collapse;'>
<tr>
    <td width='200' rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Objetivo Estrategico<b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Indicador</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Formula de medicion</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>U. medida</center></td>
    <th rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>periodo</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Direccion</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><b>Linea.Base</b></td>";
$anios=$this->get_anios($idplan);
$stringAnios="";
foreach ($anios as $key => $anio) 
{
  $stringAnios=$stringAnios."<td colspan='2' width='100' style='background-color:#A7C942;color:#ffffff;'><center>".$anio."</center></td>";
}
//$stringReporte=$stringReporte."".$stringAnios."</tr>";
$stringReporte=$stringReporte."".$stringAnios;

$stringReporte=$stringReporte."
    <td width='200' rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b> Iniciativa<b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Area responsable</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Actividad</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Cargo responsable</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Resultado esperado</b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Medio de verificacion </b></center></td>
    <td rowspan='2' style='background-color:#A7C942;color:#ffffff;'><center><b>Recursos financieros</b></center></td>
  ";

/*imprime los años*/
$stringAnios="";
foreach ($anios as $key => $anio) 
{
  $stringAnios=$stringAnios."<td colspan='4' width='100' style='background-color:#A7C942;color:#ffffff;'><center>".$anio."</center></td>";
}
$stringReporte=$stringReporte."".$stringAnios;

$stringReporte=$stringReporte."
    <td  rowspan='2' width='100' style='background-color:#A7C942;color:#ffffff;'><center><b>Fecha Inicio</b></center></td>
    <td  rowspan='2' width='100' style='background-color:#A7C942;color:#ffffff;'><center><b>Fecha Fin</b></center></td>
    <td  rowspan='2'  width='100' style='background-color:#A7C942;color:#ffffff;'><center><b>Observaciones</b></center></td>
    </tr>";

/*imprime control y meta por cada año*/
$stringContro="<tr>";
foreach ($anios as $key => $anio) 
{
  $stringContro=$stringContro."<td width='100' style='background-color:#A7C942;color:#ffffff;'><center>Control</center></td><td width='100' style='background-color:#A7C942;color:#ffffff;'><center>Meta</center></td>";
}
$stringReporte=$stringReporte."".$stringContro;

/*imprime t1,t2,t3,t4 por cada año*/
$stringContro="";
foreach ($anios as $key => $anio) 
{
  $stringContro=$stringContro."<td width='75' style='background-color:#A7C942;color:#ffffff;'><center>T1</center></td><td width='75' style='background-color:#A7C942;color:#ffffff;'><center>T2</center></td><td width='75' style='background-color:#A7C942;color:#ffffff;'><center>T3</center></td><td width='75' style='background-color:#A7C942;color:#ffffff;'><center>T4</center></td>";
}
$stringReporte=$stringReporte."".$stringContro."</br>";


return $stringReporte;
}



/*
* funcion que obtiene los controles y metas segun indicador
*
*/
function getControlesMetas($idIndicador,$idplan){
parent::conectar();
$anios=$this->get_anios($idplan);
$arraycontroles=array();
foreach ($anios as $key => $anio) 
 {
    $controlMetas=$this->getControl($idIndicador,$anio);
    $arraycontroles[]=$anio;
    $arraycontroles[]=$controlMetas[0];
    $arraycontroles[]=$controlMetas[1];
 }
 return $arraycontroles;
}/*fin de funcion*/



/*
* funcion que obtiene los controles y metas segun indicador para construir el excel
*
*/
function getControlesMetasExcel($idIndicador,$idplan){
parent::conectar();
$anios=$this->get_anios($idplan);
$arraycontroles=array();
foreach ($anios as $key => $anio) 
 {
    $controlMetas=$this->getControl($idIndicador,$anio);
    $arraycontroles[]=$controlMetas[0];
    $arraycontroles[]=$controlMetas[1];
 }
 return $arraycontroles;
}/*fin de funcion*/


/*
* funcion que obtiene los resultados de las metas a partir del idmeta
*/
function getResultadosMetas($idmeta,$idplan){
parent::conectar();
$anios=$this->get_anios($idplan);
$arrayResultados=array();
foreach ($anios as $key => $anio) {
  $resultadoMetas=$this->getResultados($idmeta,$anio);
  $arrayResultados[]=$resultadoMetas[0];
  $arrayResultados[]=$resultadoMetas[1];
  $arrayResultados[]=$resultadoMetas[2];
  $arrayResultados[]=$resultadoMetas[3];
}
 return $arrayResultados;
}/*fin de funcion*/




/*
* funcion que obtiene los controles y metas segun indicador en html devuelve una fila 
*
*/
function getControlesMetasHTML($idIndicador,$idplan){
parent::conectar();
$anios=$this->get_anios($idplan);
$controlesMetas="";
foreach ($anios as $key => $anio) 
 {
    $controlMetas=$this->getControl($idIndicador,$anio);
    $controlesMetas=$controlesMetas."<td><center>".$controlMetas[0]."</center></td><td><center>".$controlMetas[1]."</center></td>";
 }
return $controlesMetas;

}/*fin de funcion*/




/*
* funcion que recupera el limite de control y meta 
* @anio= año del indicador
* @idindicador = id del indicador
*/
function getControl($idindicador,$anio){
  parent::conectar();
  $sql="SELECT * FROM control WHERE IDINDICADOR=$idindicador AND ANIO=$anio LIMIT 0,1";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
    $data[]='-';
    $data[]='-';
    return $data;
  }else
  {
    while(!$record_consulta->EOF)
    {
      $limite=$record_consulta->fields["LIMITECTROL"];
      $met=$record_consulta->fields["META"];
      $data[]=$limite;
      $data[]=$met;
      $record_consulta->MoveNext();
    }
    return $data;
  }

}/*fin de funcion*/

/*
* funcion que recupera los resultados por año de una meta
* @idmeta = id de la meta
* @anio   = año del resultado.
* devuelve un array con 4 posiciones 0 = 1° trimestre, 1 = 2° trimestre, 2 = 3° trimestre, 3 = 4° trimestre
*/

function getResultados($idmeta,$anio){
parent::conectar();
$sql="SELECT * FROM resultadosmetas WHERE IDMETA=$idmeta AND ANIO=$anio  LIMIT 0,1";
if(is_numeric($idmeta))
{
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
    $data[]='-';
    $data[]='-';
    $data[]='-';
    $data[]='-';
    return $data;    
  }else{
         while (!$record_consulta->EOF) 
         {
           $data[]=$record_consulta->fields["T1"];
           $data[]=$record_consulta->fields["T2"];
           $data[]=$record_consulta->fields["T3"];
           $data[]=$record_consulta->fields["T4"];
           $record_consulta->MoveNext();
         }
         return $data;
  }
}else{
    $data[]='-';
    $data[]='-';
    $data[]='-';
    $data[]='-';
    return $data;      
     }


}/*fin de funcion*/


/*
* funcion que recupera los anios de un plan estrategico.
* idplan= el id de un plan estrategico de un empresa.
*/
function get_anios($idplan){
parent::conectar();
$sql="SELECT DATE_FORMAT(FECHAINICIO,'%Y' ) AS INICIO, DATE_FORMAT(FECHAFINAL,'%Y' ) AS FIN FROM planestrategico WHERE IDPLAN=$idplan";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
        return 0;
  }else{
            while(!$record_consulta->EOF){
              $inicio=$record_consulta->fields["INICIO"];
              $final=$record_consulta->fields["FIN"];
              $record_consulta->MoveNext();
               }
               for ($i=$inicio; $i <=$final ; $i++) { 
                 $data1[]=$i;
               }
       }
   return $data1;       
}/*fin de la funcion*/



/*
* funcion que obtiene los objetivos e indicadores 
*/
function getInfoObjetivosIndicadores($idperspectiva){
parent::conectar();
$sql="SELECT IDOBJ,CONCAT(CORRELATIVOOBJ,'. ',DESCRIPCIONOBJ) AS DESCRIPCIONOBJ,IDINDICADOR,CONCAT(CORRELATIVOOBJ,'.',CORRELATIVOINDICADOR,'. ',NOMBREINDICADOR) AS NOMBREINDICADOR,FORMULA,UNIDADMEDIDA,PERIODO,DIRECCIONAMIENTO,LINEABASE FROM view_cmixperspectiva WHERE IDPERPECTIVA=$idperspectiva ORDER BY CORRELATIVOOBJ,CORRELATIVOINDICADOR";
$record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0)
    {
      return 0;
    }else{
          while(!$record_consulta->EOF)
          {
            $idobjetivo=$record_consulta->fields["IDOBJ"];
            $descripObj=$record_consulta->fields["DESCRIPCIONOBJ"];
            $idIndicador=$record_consulta->fields["IDINDICADOR"];
            $nombreIndicador=$record_consulta->fields["NOMBREINDICADOR"];
            $formula=$record_consulta->fields["FORMULA"];
            $Unidad=$record_consulta->fields["UNIDADMEDIDA"];
            $periodo=$record_consulta->fields["PERIODO"];
            $dirr=$record_consulta->fields["DIRECCIONAMIENTO"];
            $lineaB=$record_consulta->fields["LINEABASE"];
            if($dirr==1)
            {
                $direccion="( + )";
            }else{
              $direccion="( - )";
            }

            $data1[]=array($idobjetivo,$descripObj,$idIndicador,$nombreIndicador,$formula,$Unidad,$periodo,$direccion,$lineaB);
            $record_consulta->MoveNext();
          }
          return $data1;
    }

  }/*fin de funcion*/


  /*
* funcion que regresa el nomrbre de la perspectiva
*/
function getNombreUnidad($idunidad){
parent::conectar();
$sql="SELECT IDUNIDAD,NOMBREUNIDAD FROM unidadorganizativa WHERE IDUNIDAD=$idunidad";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
      return " ";
  }else
  {
      while (!$record_consulta->EOF) 
      {
         $nombre=$record_consulta->fields["NOMBREUNIDAD"];
         $record_consulta->MoveNext();
      }
      return $nombre;
  }
}/*fin de funcion*/




}