package com.shriya.backend.service;

import com.shriya.backend.entity.Application;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
        private String FROM_EMAIL;

    private void sendTemplateEmail(
        String to,
        String subject,
        String template,
        Context context
) {

    try {

        MimeMessage message =
                mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        true,
                        "UTF-8"
                );

        helper.setFrom(FROM_EMAIL);

        helper.setTo(to);

        helper.setSubject(subject);

        String html =
                templateEngine.process(
                        template,
                        context
                );

        helper.setText(html, true);

        mailSender.send(message);

    }

    catch (MessagingException e) {

        throw new RuntimeException(e);

    }

}

private void sendEmail(
        String to,
        String subject,
        String body
) {
    try {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(FROM_EMAIL);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, false);

        mailSender.send(message);

        System.out.println("Email sent successfully to: " + to);

    } catch (Exception e) {

        System.err.println("Failed to send email to: " + to);
        e.printStackTrace();
    }
}
    // ===================================================
    // Welcome Email
    // ===================================================
    @Async
    public void sendWelcomeEmail(String name, String email) {

        String subject = "🎉 Welcome to InternSphere";

        String body =
                "Hello " + name + ",\n\n" +

                "Welcome to InternSphere!\n\n" +

                "Your account has been created successfully.\n\n" +

                "You can now:\n\n" +

                "• Complete your profile\n" +
                "• Upload your resume\n" +
                "• Browse internships\n" +
                "• Apply for internships\n" +
                "• Track application status\n\n" +

                "Best wishes for your career.\n\n" +

                "Regards,\n" +
                "InternSphere Team";

        sendEmail(email, subject, body);
    }

    // ===================================================
    // Application Submitted
    // ===================================================
    @Async
    public void sendApplicationSubmittedEmail(Application application) {

        String email =
                application.getStudent()
                        .getUser()
                        .getEmail();

        String name =
                application.getStudent()
                        .getFullName();

        String subject =
                "✅ Application Submitted Successfully";

        String body =
                "Hello " + name + ",\n\n" +

                "Your internship application has been submitted successfully.\n\n" +

                "Internship : " +
                application.getInternship().getTitle() +

                "\nCompany : " +
                application.getInternship().getCompanyName() +

                "\nLocation : " +
                application.getInternship().getLocation() +

                "\nStatus : Pending\n\n" +

                "You can track this application from your dashboard.\n\n" +

                "Good Luck!\n\n" +

                "InternSphere Team";

        sendEmail(email, subject, body);
    }

    // ===================================================
    // Shortlisted
    // ===================================================
    @Async
    public void sendShortlistedEmail(Application application) {

        String email =
                application.getStudent()
                        .getUser()
                        .getEmail();

        String name =
                application.getStudent()
                        .getFullName();

        String subject =
                "🎉 Congratulations! You have been Shortlisted";

        String body =
                "Hello " + name + ",\n\n" +

                "Congratulations!\n\n" +

                "You have been shortlisted for\n\n" +

                application.getInternship().getTitle() +

                "\nat " +

                application.getInternship().getCompanyName() +

                ".\n\nPlease login to InternSphere for more details.\n\n" +

                "Best Wishes!\n\n" +

                "InternSphere Team";

        sendEmail(email, subject, body);
    }

    // ===================================================
    // Accepted
    // ===================================================
    @Async
    public void sendAcceptedEmail(Application application) {

        String email =
                application.getStudent()
                        .getUser()
                        .getEmail();

        String name =
                application.getStudent()
                        .getFullName();

        String subject =
                "🎉 Congratulations! Application Accepted";

        String body =
                "Hello " + name + ",\n\n" +

                "Congratulations!\n\n" +

                "Your application has been ACCEPTED.\n\n" +

                "Company : " +
                application.getInternship().getCompanyName() +

                "\nRole : " +
                application.getInternship().getTitle() +

                "\nLocation : " +
                application.getInternship().getLocation() +

                "\n\nWe wish you great success in your internship.\n\n" +

                "InternSphere Team";

        sendEmail(email, subject, body);
    }

    // ===================================================
    // Rejected
    // ===================================================
    @Async
    public void sendRejectedEmail(Application application) {

        String email =
                application.getStudent()
                        .getUser()
                        .getEmail();

        String name =
                application.getStudent()
                        .getFullName();

        String subject =
                "Application Update";

        String body =
                "Hello " + name + ",\n\n" +

                "Thank you for applying through InternSphere.\n\n" +

                "Unfortunately, your application for\n\n" +

                application.getInternship().getTitle() +

                "\nat " +

                application.getInternship().getCompanyName() +

                "\nwas not selected.\n\n" +

                "Don't be discouraged.\n" +

                "Keep applying to more internships.\n\n" +

                "We wish you success.\n\n" +

                "InternSphere Team";

        sendEmail(email, subject, body);
    }

}