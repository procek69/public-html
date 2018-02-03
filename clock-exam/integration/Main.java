import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Main {

    public static void main(String[] args) {
        JFrame wnd = new JFrame("NoSS");
        final JTextField timeField = new JTextField("60", 6);
        JButton startButton = new JButton("Start");

        startButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent event) {
                try {
                    long timeout = Long.parseLong(timeField.getText());
                    Runtime.getRuntime().exec(new String[]{
                            "cmd.exe", "/C", "start",
                            "http://users.pja.edu.pl/~procek69/clock-exam/?rfs^&autoplay^&t=" + timeout
                    }).waitFor();

                    startMouseMove(System.currentTimeMillis() + timeout * 60000);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            }
        });

        Container cp = wnd.getContentPane();
        cp.setLayout(new FlowLayout());
        cp.add(new JLabel("Exam timeout:"));
        cp.add(timeField);
        cp.add(startButton);

        wnd.pack();
        wnd.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        wnd.setVisible(true);
    }

    public static void startMouseMove(long timeEnd) throws Exception {
        new Thread(new Runnable() {
            Robot r = new Robot();
            int mul = 50;

            @Override
            public void run() {
                while (System.currentTimeMillis() < timeEnd) {
                    for (int i = 1; i <= 100; i++) {
                        r.mouseMove((int) (400 + 2 * mul * Math.cos(0.5 * i)), (int) (200 + mul * Math.sin(i)));
                        r.delay(100);
                    }
                }
            }
        }).start();
    }
}