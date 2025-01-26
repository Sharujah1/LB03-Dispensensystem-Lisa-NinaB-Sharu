USE dispensen;

INSERT INTO person (first_name, last_name, birth_date, phone_number, email_address, password)
VALUES ('Peter', 'Silie', '1990-04-01' , '+4915112345678', 'peter.silie@example.com', 'Kraeuter123!'),
       ('Rainer', 'Zufall', '1978-11-23', '+4915176543210', 'rainer.zufall@example.com', 'ZufallsPass123!'),
       ('Frank', 'Reich', '1977-04-18' , '+4915188899001', 'frank.reich@example.com', 'GanzViel789!')
       ('Anna', 'Belle', '1985-02-14', '+4915111122233', 'anna.belle@example.com', 'BellePass2025!'),
       ('Max', 'Mustermann', '1992-06-12', '+4915123344556', 'max.mustermann@example.com', 'Maxi2023!'),
       ('Lisa', 'Lustig', '1988-09-30', '+4915133445566', 'lisa.lustig@example.com', 'Lustig2024!'),
       ('Karl', 'Klug', '1980-12-01', '+4915144556677', 'karl.klug@example.com', 'KlugerKarl123!'),
       ('Sophie', 'Schlau', '1995-07-15', '+4915155667788', 'sophie.schlau@example.com', 'SophiePass2025!'),
       ('Paul', 'Panther', '1991-03-10', '+4915166778899', 'paul.panther@example.com', 'Panther2024!'),
       ('Clara', 'Clever', '1983-08-22', '+4915177889900', 'clara.clever@example.com', 'CleverClara456!');

INSERT INTO dispensation (person_id, status_id, date_from, date_til, subject, reason, comments)
VALUES (1, 101, '2025-01-15', '2025-01-17', 'Maths', 'Flu and high fever', 'Doctors certificate provided.'),
       (2, 102, '2025-02-01', '2025-02-03', 'English', 'Family emergency', 'Details discussed with the principal.'),
       (3, 103, '2025-01-20', '2025-01-22', 'Geography', 'Professional development workshop', 'School-approved event.'),
       (4, 104, '2025-03-05', '2025-03-06', 'Physics', 'Migraine', 'Recurring issue; teacher will reschedule classes.'),
       (5, 105, '2025-02-10', '2025-02-12', 'German', 'Pre-planned holiday', 'Approved in advance by administration.'),
       (6, 106, '2025-01-30', '2025-02-01', 'French', 'Relatives wedding', 'Teacher has arranged for a substitute.'),
       (7, 107, '2025-01-25', '2025-01-26', 'History', 'Appointment checkup', 'Partial day absence; adjusted accordingly.'),
       (8, 108, '2025-02-15', '2025-02-15', 'Geometry', 'Train cancellations due to strikes', 'Notified admin early.'),
       (9, 109, '2025-03-01', '2025-03-03', 'Sports', 'Death of a family member', 'Condolences offered by the school.'),
       (10, 110, '2025-03-10', '2025-03-10', 'English', 'Heavy snowfall', 'School declared closure for the day.');

INSERT INTO status (status_text)
VALUES ('Accepted'),
       ('Accepted'),
       ('Denied'),
       ('Accepted'),
       ('Accepted'),
       ('Accepted'),
       ('Denied'),
       ('Accepted'),
       ('In progress'),
       ('In progress');
