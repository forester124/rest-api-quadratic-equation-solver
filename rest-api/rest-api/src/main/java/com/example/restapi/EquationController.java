package com.example.restapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EquationController {

    private Equation eq = new Equation(0, 0, 0);

    @GetMapping("/equations/oblicz/{abc}")
    public String oblicz(@PathVariable String abc) {
        if (abc == null || abc.equals("")) return "";
        String[] arr = abc.split(",");
        double a = Double.parseDouble(arr[0]);
        double b = Double.parseDouble(arr[1]);
        double c = Double.parseDouble(arr[2]);

        eq.setA(a);
        eq.setB(b);
        eq.setC(c);

        int zwrot = eq.oblicz();
        String ans = "";
        if (zwrot == 1) {
            ans = ans + eq.getDelta() + "," + eq.getX1() + "," + eq.getX2();
        } else if (zwrot == 0) {
            ans = ans + eq.getDelta() + "," + eq.getX1();
        } else {
            ans = ans + eq.getDelta();
        }

        return ans;
    }

}
