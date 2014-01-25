<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ConsultaReportes.php");   
    require_once("../../../recursos/phpexcel/PHPExcel.php");

/*
* ARCHIVO PHP QUE GENERA EL ARCHIVO EXCEL DE UN CMI INTEGRANDO: OBJETIVOS,INDICADORES, INICIATIVAS Y METAS OPERATIVAS
*/


 $idplan=$_SESSION["idplan"];
 $empresa=$_SESSION["empresa"];
 $idu=$_REQUEST["idU"];    
 

//$idG=$_REQUEST["idgrupo"];
$objPhpExcel=new PHPExcel();
$objReportes=new ConsultaReportes();

$objPhpExcel->getProperties()->setCreator("Avance y Desempeño.")
                                 ->setLastModifiedBy("Avance y Desempeño")
                                 ->setTitle("CMI por perspectivas")
                                 ->setSubject("Excel cmi por unidad organizativa")
                                 ->setDescription("Archivo del cuadro de mando integral por unidades")
                                 ->setKeywords("office excel")
                                 ->setCategory("file");
    
$objPhpExcel->setActiveSheetIndex(0);

 $sheet=$objPhpExcel->getActiveSheet();


 $sheet->getColumnDimension('A')->setWidth(100);
 $sheet->getColumnDimension('B')->setWidth(80);
 $sheet->getColumnDimension('C')->setWidth(80);
 $sheet->getColumnDimension('D')->setWidth(40);
 $sheet->getColumnDimension('E')->setWidth(20);
 $sheet->getColumnDimension('F')->setWidth(18);
 $sheet->getColumnDimension('G')->setWidth(15);
 $sheet->getColumnDimension('H')->setWidth(10);
 $sheet->getColumnDimension('I')->setWidth(10);
 $sheet->getColumnDimension('J')->setWidth(10);
 $sheet->getColumnDimension('K')->setWidth(10);
 $sheet->getColumnDimension('L')->setWidth(10);
 $sheet->getColumnDimension('M')->setWidth(10);
 $sheet->getColumnDimension('N')->setWidth(10);
 $sheet->getColumnDimension('O')->setWidth(10);
 $sheet->getColumnDimension('P')->setWidth(10);
 $sheet->getColumnDimension('Q')->setWidth(10);
 $sheet->getColumnDimension('R')->setWidth(10);
 $sheet->getColumnDimension('S')->setWidth(10);
 $sheet->getColumnDimension('T')->setWidth(10);
 $sheet->getColumnDimension('U')->setWidth(50);
 $sheet->getColumnDimension('V')->setWidth(50);
 $sheet->getColumnDimension('W')->setWidth(50);
 $sheet->getColumnDimension('X')->setWidth(50);
 $sheet->getColumnDimension('Y')->setWidth(50);
 $sheet->getColumnDimension('Z')->setWidth(50);
 $sheet->getColumnDimension('AA')->setWidth(30);
 $sheet->getColumnDimension('AB')->setWidth(10);
 $sheet->getColumnDimension('AC')->setWidth(10);
 $sheet->getColumnDimension('AD')->setWidth(10);
 $sheet->getColumnDimension('AE')->setWidth(10);
 $sheet->getColumnDimension('AF')->setWidth(10);
 $sheet->getColumnDimension('AG')->setWidth(10);
 $sheet->getColumnDimension('AH')->setWidth(10);
 $sheet->getColumnDimension('AI')->setWidth(10);
 $sheet->getColumnDimension('AJ')->setWidth(10);
 $sheet->getColumnDimension('AK')->setWidth(10);
 $sheet->getColumnDimension('AL')->setWidth(10);
 $sheet->getColumnDimension('AM')->setWidth(10);
 $sheet->getColumnDimension('AN')->setWidth(10);
 $sheet->getColumnDimension('AO')->setWidth(10);
 $sheet->getColumnDimension('AP')->setWidth(10);
 $sheet->getColumnDimension('AQ')->setWidth(10);
 $sheet->getColumnDimension('AS')->setWidth(10);
 $sheet->getColumnDimension('AT')->setWidth(10);
 $sheet->getColumnDimension('AU')->setWidth(10);
 $sheet->getColumnDimension('AV')->setWidth(10);
 $sheet->getColumnDimension('AW')->setWidth(10);
 $sheet->getColumnDimension('AX')->setWidth(10);
 $sheet->getColumnDimension('AY')->setWidth(10);
 $sheet->getColumnDimension('AZ')->setWidth(20);
 
 $sheet->getColumnDimension('BA')->setWidth(20);
 $sheet->getColumnDimension('BB')->setWidth(30);
 $sheet->getColumnDimension('BC')->setWidth(30);
 $sheet->getColumnDimension('BD')->setWidth(30);
 $sheet->getColumnDimension('BE')->setWidth(30);
 $sheet->getColumnDimension('BF')->setWidth(30);
 $sheet->getColumnDimension('BG')->setWidth(30);
 $sheet->getColumnDimension('BH')->setWidth(30);
 $sheet->getColumnDimension('BI')->setWidth(30);
 $sheet->getColumnDimension('BJ')->setWidth(30);
 $sheet->getColumnDimension('BK')->setWidth(30);
 $sheet->getColumnDimension('BL')->setWidth(30);
 $sheet->getColumnDimension('BM')->setWidth(30);
 $sheet->getColumnDimension('BN')->setWidth(30);
 $sheet->getColumnDimension('BO')->setWidth(30);
 $sheet->getColumnDimension('BP')->setWidth(30);
 $sheet->getColumnDimension('BQ')->setWidth(30);
 $sheet->getColumnDimension('BS')->setWidth(30);
 $sheet->getColumnDimension('BT')->setWidth(30);
 $sheet->getColumnDimension('BU')->setWidth(30);
 $sheet->getColumnDimension('BV')->setWidth(30);
 $sheet->getColumnDimension('BW')->setWidth(30);
 $sheet->getColumnDimension('BX')->setWidth(30);
 $sheet->getColumnDimension('BY')->setWidth(30);
 $sheet->getColumnDimension('BZ')->setWidth(30);


$sheet->getStyle("A4:Z4")->applyFromArray(array("font" => array( "bold" => true)));
$sheet->getStyle("A5:BB5")->applyFromArray(array("font" => array( "bold" => true)));
$sheet->getStyle("A1:B2")->applyFromArray(array("font" => array( "bold" => true)));
 
$sheet->getStyle("A4:BB5")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$sheet->getStyle("D6:BB174")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$sheet->getStyle("A6:BB174")->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
$sheet->getStyle("Z4:AB174")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);


$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => 'FF000000'),
        ),
    ),
);

$sheet->getStyle('A4:BB5')->applyFromArray($styleThinBlackBorderOutline);/*border de encabezad*/

$sheet->mergeCells('A1:B1');
$sheet->setCellValueByColumnAndRow(0,1,''.$empresa); 
$sheet->getStyle('A1')->getFont()->setSize(22);
$sheet->getStyle('A1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_DARKBLUE);

$sheet->mergeCells('A2:B2');
$sheet->setCellValueByColumnAndRow(0,2,'Plan Estrategico Tactico'); 
$sheet->getStyle('A2')->getFont()->setSize(20);
$sheet->getStyle('A2')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_DARKBLUE);



 $objConsultaReportes=new ConsultaReportes();
    if($objConsultaReportes!=null)
    {
                     if(!$objConsultaReportes->open_con())
                {
                }
                elseif ($objConsultaReportes->open_con()) 
                                {
                                    $nombreUnidad=$objConsultaReportes->getNombreUnidad($idu);
                                    $ReporteExcel=$objConsultaReportes->ReporteCmixUnidades($idu,$idplan);
                                    
                                    $encabezado=$objConsultaReportes->EncabezadoExcelUnidades();
                                    $sheet->setCellValueByColumnAndRow(0,3,'Unidad : '.$nombreUnidad); 
                                    /**************************************/
                                    /* Imprime y une las celdas del encabezado.
                                    */
                                    $columna=0;
                                    $columnaCaracter=65;
                                    foreach ($encabezado as $key => $filaC)
                                       {
                                           $letra=chr($columnaCaracter);
                                           $sheet->setCellValueByColumnAndRow($columna,4,''.$filaC); 
                                           $sheet->mergeCells($letra.'4:'.$letra.'5'); /* une las dos celdas*/
                                           $columnaCaracter++;
                                           $columna++;
                                       }

                                    /**************************************/
                                    /*
                                    * Ayudan a recordar la posicion actual.
                                    */
                                    $columnaCaracterTemp=$columnaCaracter;
                                    $columnaActual=$columna;
                                    $columnaActual2=$columna;/*guarda la referencia para continuar imprimiendo los controles y metas*/

                                    $anios=$objConsultaReportes->get_anios($idplan);
                                    foreach ($anios as $key => $anio) {
                                        $sheet->setCellValueByColumnAndRow($columnaActual,4,''.$anio);
                                        $columnaActual++;
                                        $columnaActual++;
                                        $letra1=chr($columnaCaracterTemp);
                                        $columnaCaracterTemp++;
                                        $letra2=chr($columnaCaracterTemp);
                                        $columnaCaracterTemp++;
                                        $sheet->mergeCells($letra1.'4:'.$letra2.'4');
                                    }
                                                                        


                                    foreach ($anios as $key => $anio) {
                                        $sheet->setCellValueByColumnAndRow($columnaActual2,5,'Control');
                                        $columnaActual2++;
                                        $sheet->setCellValueByColumnAndRow($columnaActual2,5,'Meta');
                                        $columnaActual2++;
                                    }

                                    $columnaActual3=$columnaActual2;
                                    $encabezado2Excel=$objConsultaReportes->EncabezadoExcelIniciativasYoperativas();
                                    foreach ($encabezado2Excel as $key => $headIniciativas) 
                                    {
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,''.$headIniciativas);
                                        $columnaActual3++;
                                    }
                                    $columnaActual3++;/*le aumento una posicion para que  el if 64 +n >90 de true */

                                    /*imprimir los años para los trimestres*/
                                    $columnaActual4=$columnaActual3;
                                    $columnaCaracterTemp=$columnaActual3;
                                    $ApoyoLetra=65;
                                    foreach ($anios as $key => $anio) {
                                        $sheet->setCellValueByColumnAndRow(($columnaActual4-1),4,''.$anio);
                                            $columnaActual4++;
                                            $columnaActual4++;                                        
                                            $columnaActual4++;
                                            $columnaActual4++;

                                        if((64+$columnaCaracterTemp)>90)
                                        {
                                           $ApoyoLetra++;
                                           $letra1=chr($ApoyoLetra);
                                           //echo $letra1."<br>";
                                           $columnaCaracterTemp++;
                                           $columnaCaracterTemp++;
                                           $columnaCaracterTemp++;
                                           $columnaCaracterTemp++;
                                           $ApoyoLetra++;
                                           $ApoyoLetra++;
                                           $ApoyoLetra++;
                                           
                                           $letra2=chr($ApoyoLetra);
                                          // echo $letra2."<br>";
                                          // echo "<br><br><br>";
                                           $sheet->mergeCells('A'.$letra1.'4:A'.$letra2.'4'); 
                                           

                                        }else{
                                            
                                            
                                            $columnaCaracterTemp++;
                                            $columnaCaracterTemp++;
                                            $columnaCaracterTemp++;
                                            $columnaCaracterTemp++;
                                                                                        

                                             }
                                       
                                       } 

                                      

                                    /*
                                    * IMPRIMIR  T1, T2 , T3 Y T4 por cada año
                                    */
                                    $columnaActual3--;/*disminuyo en 1 para que se se imprima correctamente*/
                                    foreach ($anios as $key => $anio) {
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,'T1');
                                        $columnaActual3++;
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,'T2');
                                        $columnaActual3++;
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,'T3');
                                        $columnaActual3++;
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,'T4');
                                        $columnaActual3++;                                        
                                    }                                  


                                    $encabezado3Excel=$objConsultaReportes->EncabezadoExcelUltimo();
                                    foreach ($encabezado3Excel as $key => $headIniciativas) 
                                    {
                                        $sheet->setCellValueByColumnAndRow($columnaActual3,5,''.$headIniciativas);
                                        $columnaActual3++;
                                    }


                                    /*procesar el cuerpo del reporte*/
                                    $Fila=6;
                                    foreach ($ReporteExcel as $key => $fila) 
                                    {
                                        $c=0;
                                        foreach ($fila as $key => $columna) 
                                        {
                                            $sheet->setCellValueByColumnAndRow($c,$Fila,''.$columna);
                                            $sheet->getRowDimension($Fila)->setRowHeight(30);
                                            $c++;
                                        }
                                        

                                        $Fila++;
                                    }

                                    $NIndicador=count($ReporteExcel);
                                    $Ncolumnas=$ReporteExcel[0];
                                    $Ncolumnas2=count($Ncolumnas);
                                    $ApoyoLetra=64;/* sirve cuando se excede el valor limite de 90 =z*/
                                    $ApoyoLetra2=64;
                                     for ($i=1; $i <=$Ncolumnas2; $i++) 
                                     { 
                                        if((64+$i)>90)
                                        {
                                         $ApoyoLetra++;
                                            if($ApoyoLetra>90){
                                                 $ApoyoLetra2++;
                                                 $sheet->getStyle('B'.chr($ApoyoLetra2).'4:B'.chr($ApoyoLetra2).''.($NIndicador+5))->applyFromArray($styleThinBlackBorderOutline);
                                            }else{
                                            $sheet->getStyle('A'.chr($ApoyoLetra).'4:A'.chr($ApoyoLetra).''.($NIndicador+5))->applyFromArray($styleThinBlackBorderOutline);
                                                }
                                        }else{
                                        $sheet->getStyle(chr((64+$i)).'4:'.chr((64+$i)).''.($NIndicador+5))->applyFromArray($styleThinBlackBorderOutline);
                                             }
                                     }
                                    
                                    
                                }
    }

 
  $Fila=1;


//$sheet->setCellValueByColumnAndRow(3,3,'prueba');
  /*
  foreach ($ReporteEmpleados as $key => $Empleado) {
      
       foreach ($Empleado as $key => $Evaluador) {
               
            //$i=65;
             $i=0;
            foreach ($Evaluador as $key => $columna) 
            {
             $letra=chr($i).''.$Fila;
             //$sheet->setCellValue($letra,''.$columna);
             $sheet->setCellValueByColumnAndRow($i,$Fila,''.$columna);
             $i++;
            }
            $Fila++;
           
       }
   }*/

   
    $sheet->setTitle('CMI por Unidad');


    $objPhpExcel->setActiveSheetIndex(0);

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="ReporteCMIUnidad.xls"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPhpExcel, 'Excel5');
    $objWriter->save('php://output');
exit;




    



