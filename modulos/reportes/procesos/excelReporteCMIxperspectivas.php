<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ConsultaReportes.php");   
    require_once("../../../recursos/phpexcel/PHPExcel.php");

 $idplan=$_SESSION["idplan"];
 $idP=$_REQUEST["idp"];    


//$idG=$_REQUEST["idgrupo"];
$objPhpExcel=new PHPExcel();
$objReportes=new ConsultaReportes();

$objPhpExcel->getProperties()->setCreator("Avance y Desempeño.")
                                 ->setLastModifiedBy("Avance y Desempeño")
                                 ->setTitle("CMI por perspectivas")
                                 ->setSubject("Excel cmi por perspectivas")
                                 ->setDescription("Archivo del cuadro de mando integral por perspectivas")
                                 ->setKeywords("office excel")
                                 ->setCategory("file");
    
$objPhpExcel->setActiveSheetIndex(0);

 $sheet=$objPhpExcel->getActiveSheet();


 $sheet->getColumnDimension('A')->setWidth(50);
 $sheet->getColumnDimension('B')->setWidth(40);
 $sheet->getColumnDimension('C')->setWidth(40);
 $sheet->getColumnDimension('D')->setWidth(20);
 $sheet->getColumnDimension('E')->setWidth(18);
 $sheet->getColumnDimension('F')->setWidth(15);
 $sheet->getColumnDimension('G')->setWidth(10);
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
 $sheet->getColumnDimension('U')->setWidth(10);
 $sheet->getColumnDimension('V')->setWidth(10);
 $sheet->getColumnDimension('W')->setWidth(10);
 $sheet->getColumnDimension('X')->setWidth(10);
 $sheet->getColumnDimension('Y')->setWidth(10);
 $sheet->getColumnDimension('Z')->setWidth(10);
 $sheet->getColumnDimension('AA')->setWidth(10);
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
 $sheet->getColumnDimension('AZ')->setWidth(10);
 
 $sheet->getColumnDimension('BA')->setWidth(30);
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


$sheet->getStyle("A1:Z1")->applyFromArray(array("font" => array( "bold" => true)));
$sheet->getStyle("A2:Z2")->applyFromArray(array("font" => array( "bold" => true)));
 
$sheet->getStyle("A1:Z2")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
$sheet->getStyle("D3:Z174")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => 'FF000000'),
        ),
    ),
);



$sheet->getStyle('A1:S2')->applyFromArray($styleThinBlackBorderOutline);


 $objConsultaReportes=new ConsultaReportes();
    if($objConsultaReportes!=null)
    {
                     if(!$objConsultaReportes->open_con())
                {
                }
                elseif ($objConsultaReportes->open_con()) 
                                {
                                    $ReporteExcel=$objConsultaReportes->ReporteCmiPerspectivasExcel(1,$idplan);
                                                                        
                                    $encabezado=$objConsultaReportes->EncabezadoExcel();
                                    $columna=0;
                                    $columnaCaracter=65;
                                    foreach ($encabezado as $key => $filaC)
                                       {
                                           $letra=chr($columnaCaracter);
                                           $sheet->setCellValueByColumnAndRow($columna,1,''.$filaC); 
                                           $sheet->mergeCells($letra.'1:'.$letra.'2'); /* une las dos celdas*/
                                           $columnaCaracter++;
                                           $columna++;
                                       }
                                    $columnaCaracterTemp=$columnaCaracter;
                                    $columnaActual=$columna;
                                    $columnaActual2=$columna;/*guarda la referencia para continuar imprimiendo los controles y metas*/

                                    $anios=$objConsultaReportes->get_anios($idplan);
                                    foreach ($anios as $key => $anio) {
                                        
                                        $sheet->setCellValueByColumnAndRow($columnaActual,1,''.$anio);
                                        $columnaActual++;
                                        $columnaActual++;
                                        $letra1=chr($columnaCaracterTemp);
                                        $columnaCaracterTemp++;
                                        $letra2=chr($columnaCaracterTemp);
                                        $columnaCaracterTemp++;
                                        $sheet->mergeCells($letra1.'1:'.$letra2.'1');
                                    }

                                    foreach ($anios as $key => $anio) {
                                        $sheet->setCellValueByColumnAndRow($columnaActual2,2,'Control');
                                        $columnaActual2++;
                                        $sheet->setCellValueByColumnAndRow($columnaActual2,2,'Meta');
                                        $columnaActual2++;
                                    }


                                    /*procesar el cuerpo del reporte*/
                                    $Fila=3;
                                    foreach ($ReporteExcel as $key => $fila) {
                                        $c=0;
                                        foreach ($fila as $key => $columna) {
                                            $sheet->setCellValueByColumnAndRow($c,$Fila,''.$columna);
                                            $c++;
                                        }
                                        

                                        $Fila++;
                                    }

                                    $NIndicador=count($ReporteExcel);
                                    $Ncolumnas=$ReporteExcel[0];
                                    $Ncolumnas2=count($Ncolumnas);

                                     for ($i=1; $i <=$Ncolumnas2; $i++) { 
                                        $sheet->getStyle(chr((64+$i)).'1:'.chr((64+$i)).''.($NIndicador+2))->applyFromArray($styleThinBlackBorderOutline);
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

   
    $sheet->setTitle('CMI por perspectivas');


    $objPhpExcel->setActiveSheetIndex(0);

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="ReporteCMI.xls"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPhpExcel, 'Excel5');
    $objWriter->save('php://output');
exit;




    



