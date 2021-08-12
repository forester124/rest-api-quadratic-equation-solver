package com.example.restapi;

public class Equation {

    private double a;
    private double b;
    private double c;

    private double x1;
    private double x2;
    private double delta;

    public Equation(double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public void setA(double a) {
        this.a = a;
    }

    public void setB(double b) {
        this.b = b;
    }

    public void setC(double c) {
        this.c = c;
    }

    public double getX1() {
        return x1;
    }

    public double getX2() {
        return x2;
    }

    public double getDelta() {
        return delta;
    }

    public int oblicz() {
        double delta = b*b - 4*a*c;
        this.delta = delta;
        if (delta < 0) {
            return -1;
        } else if (delta == 0) {
            if (b == 0)
                x1 = b/(2*a);
            else
                x1 = (-b)/(2*a);
            return 0;
        } else if (delta > 0) {
            x1 = ((-b) - Math.sqrt(delta))/(2*a);
            x2 = ((-b) + Math.sqrt(delta))/(2*a);
            return 1;
        }
        return -1;
    }
}
