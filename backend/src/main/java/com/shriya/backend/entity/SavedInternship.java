package com.shriya.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "saved_internships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedInternship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentProfile student;

    @ManyToOne
    @JoinColumn(name = "internship_id")
    private Internship internship;

    private LocalDateTime savedAt;

}