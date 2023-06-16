/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */
package pe.edu.upeu.TresEnRaya;

import pe.edu.upeu.TresEnRaya.gui.ControllerGame;
import pe.edu.upeu.TresEnRaya.gui.Juego;
import pe.edu.upeu.TresEnRaya.gui.ModelGame;

/**
 *
 * @author HP
 */
public class TresenRaya {

    public static void main(String[] args) {
        ModelGame model = new ModelGame();
        Juego view = new Juego();
        ControllerGame controlador = new ControllerGame(view, model);
        view.setLocationRelativeTo(null);
        view.setVisible(true);
    }
}
