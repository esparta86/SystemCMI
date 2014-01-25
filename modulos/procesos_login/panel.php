<?php
$tipo=$_GET["tipousuario"];


	if($tipo==1){//Administrador
	echo '<table border="0" width="90%" cellspacing="5" cellpadding="10">          
        <tr>
        <td width="20%"><center><a href="gestion_empresas/gestionEmpresas.php" target="_blank"><img src="../recursos/img/empresas.png" width="150" height="150"></a></center></td>
		<td width="20%"><center><a href="gestion_planes/gestion_planes.php" target="_blank"><img src="../recursos/img/plan.png" width="150" height="150"></a></center></td>
        <td width="20%"><center><a href="gestion_areas/gestion_areas.php" target="_blank"><img src="../recursos/img/unidadesOrganizativas.png" width="150" height="150"></a></center></td>   
        <td width="20%"><center><a href="gestion_cargo/interfazGestionCargo.php" target="_blank"><img src="../recursos/img/cargos.png" width="150" height="150"></a></center></td>   
        <td width="20%"><center><a href="admin/admin.php" target="_blank"><img src="../recursos/img/Gestionuser.png" width="150" height="150"></a></center></td>
        </tr></table>';
             }

        if($tipo==2){// otro tipo de usuario
        	echo '<table border="0" width="90%" cellspacing="5" cellpadding="10">          
		<tr>            
                        <td width="20%"><a href="VistaMision/misionVisionE.php" target="_blank"><img src="../recursos/img/VisionMisionValores.png" width="225" height="225"></a></td>
                    	<td width="20%"><a href="gestion_perspectivas/gestion_perspectivas.php" target="_blank"><img src="../recursos/img/perpectiva.png" width="225" height="225"></a></td>
                        <td width="20%"><a href="gestion_foda/gestion_foda.php" target="_blank"><img src="../recursos/img/foda.png" width="225" height="225"></a></td>
                        <td width="20%"><a href="gestion_objetivoE/gestion_objetivoE.php" target="_blank"><img src="../recursos/img/diana.png" width="225" height="225"></a></td>
                        <td width="20%"><a href="gestion_indicadores/gestion_indicadores.php" target="_blank"><img src="../recursos/img/KPIs.png" width="225" height="225"></a></td>
                        
                        </tr>
                        <tr>
                        <td width="20%"><a href="gestion_iniciativas/gestion_iniciativas.php" target="_blank"><img src="../recursos/img/iniciativaE.png" width="200" height="200"></a></td>
                        <td width="20%"><a href="gestion_metas/gestion_metas.php" target="_blank"><img src="../recursos/img/metasO.png" width="200" height="200"></a></td>
                        <td width="20%"><a href="gestion_resultadoctrol/gestion_resultadoctrol.php" target="_blank"><img src="../recursos/img/resultados.png" width="200" height="200"></a></td>
                    	<td width="20%"><a href="menuReportes.php" target="_blank"><img src="../recursos/img/reportes.png" width="200" height="200"></a></td>


                        </tr>
                    	</table>';


                   }

         

