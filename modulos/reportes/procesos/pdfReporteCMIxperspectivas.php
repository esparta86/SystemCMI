<?php
    session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ConsultaReportes.php");	
    require_once("../../../recursos/MPDF54/mpdf.php");	


    $imageempresa="../../../recursos/img/empresas/".$_SESSION["imagen"];
    $empresa=$_SESSION["empresa"];
    $idplan=$_SESSION["idplan"];
    $idP=$_REQUEST["idp"];    

$objConsultaReportes=new ConsultaReportes();
    if($objConsultaReportes!=null){
			    	 if(!$objConsultaReportes->open_con())
			    {
			    }
			    elseif ($objConsultaReportes->open_con()) 
							    {
							    	$data=$objConsultaReportes->ReporteCmiPerspectivas($idP,$idplan);
							    	$nombrePerspectiva=$objConsultaReportes->getNombrePerspectiva($idP);
									setlocale(LC_TIME, 'spanish');
										$mpdf=new mPDF('win-1252','Folio','','',10,10,30,20,10,10,'L');
										$mpdf->ignore_invalid_utf8 = true;
										$mpdf->SetDisplayMode('fullpage');
										$mpdf->SetHTMLHeader('<center>
														<table border="0"  width="90%" cellspacing="0" cellpadding="0" align="center">
															<tr>
																<td width="15%"><img src="'.$imageempresa.'" width="125" height="80" /></td>
																<td width="70%" align="center">
																	<div><font style="font-size:16">'.$empresa.'</font></div>
																	<div><font style="font-size:16">Reporte del CMI por perpectivas</font></div>
																	<div><font style="font-size:16">'.$nombrePerspectiva.'</font></div>
																</td>
																	
															</tr>	
															</table>
															</center>');
									   
         						       $mpdf->SetFooter('|Pagina '.'{PAGENO}  | FECHA IMPRESION '.date("d/m/Y"));
										$mpdf->AliasNbPages();
										$mpdf->AddPage('L');
										$mpdf->WriteHTML($data);
										
									    $mpdf->Output('pdf_cmixperspectivas.pdf','D');

							    }
		}


	
	function cabezeraPersonalizada($mpdf){
						$mpdf->writeHTML($tabla_header);

	}

	
	
  