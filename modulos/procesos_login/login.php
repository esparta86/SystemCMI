<?php
	session_start();
    require_once("../../recursos/conexion/bd_CIM.conf");
    require_once("../../recursos/adodb/adodb.inc.php");
    require_once("../../recursos/conexion/conexion.class.php");
    require_once("../../recursos/class/usuario.class.php");

    $nick = $_REQUEST['nick_emp'];
	$pass = $_REQUEST['pass_emp'];

    $objUsuario=new Usuario();
    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
			
			    }
			    elseif ($objUsuario->open_con()) 
							    {
							        $datos = $objUsuario->login($nick, $pass);

							        if($datos[0])
							        {
							           $tipo=$datos[1];
							           echo "{success:true, bandera:1,tipo:$tipo}"; 
							        }
							        else
							        {
							            echo "{success:true, bandera:2}";
							        }
							    }

    } 
