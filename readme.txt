Course Table
1. '/create-course-table' - it creates a course table by making a get request. Schema - 'course_id INT AUTO_INCREMENT PRIMARY KEY, course_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP'
2. '/insert-course' - it insert 'course_name' and 'description' in course table by making a post request.
3. '/fetch-courses' - it fetch all the courses from course table by a get request.
4. '/fetch-course/:id' - it fetch a particular course by its course_id by a get request.
5. '/update-course/:id' - it updates any field that you want to update in course table by making a PUT request by course_id
6. '/delete-course/:id' - delete a particular course and all of its subjects and topics from subject and topic table by making DELETE request by its course_id.


Subject Table
1. '/create-subject-table' - it creates a subject table by making a get request. Schema - 'subject_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT NOT NULL, subject_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id)'
2. '/insert-subject' - it insert 'subject_name', 'course_id' and 'description' in subject table by making a post request.
3. '/fetch-subjects' - it fetch all the subjects from subject table by a get request.
4. '/fetch-subject-by-subjectid/:id' - it fetch a particular subject by its subject_id by a get request.
5. '/fetch-subject-by-courseid/:id' - it fetch set of subjects by its course_id by a get request.
6. '/update-subject/:id' - it updates any field that you want to update in subject table by making a PUT request by subject_id
7. '/delete-subject/:id' - delete a particular subject and all the topics under it in topic table by making DELETE request by subject_id

Subject Table
1. '/create-topic-table' - it creates a topic table by making a get request. Schema - 'topic_id INT AUTO_INCREMENT PRIMARY KEY, topic_name VARCHAR(256) NOT NULL, description TEXT, course_id INT NOT NULL, subject_id INT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id),  FOREIGN KEY (subject_id) REFERENCES subject(subject_id)'
2. '/insert-topic' - it insert 'topic_name', 'course_id', 'subject_id' and 'description' in topic table by making a post request.
3. '/fetch-topics' - it fetch all the topics from topic table by a get request.
4. '/fetch-topic-by-subjectid/:id' - it fetch a particular topic by its subject_id by a get request.
5. '/fetch-topic-by-courseid/:id' - it fetch set of topics by its course_id by a get request.
6. '/fetch-topic-by-topicid/:id' - it fetch a particular topic by its topic_id by a get request.
7. '/update-topic/:id' - it updates any field that you want to update in topic table by making a PUT request by topic_id
8. '/delete-topic/:id' - delete a particular topic with a topic_id by making DELETE request.

Lecture Table 
1. '/lecture/create-lecture-table' - it creates a lecture table by making a get request. Schema - 'CREATE TABLE lecture(lecture_id INT AUTO_INCREMENT PRIMARY KEY, subject_id INT NOT NULL, topic_id INT NOT NULL, section TEXT, video_link TEXT, study_material TEXT, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (subject_id) REFERENCES subject(subject_id), FOREIGN KEY (topic_id) REFERENCES topic(topic_id))'
2. '/lecture/insert-lecture' it insert 'subject_id', 'topic_id', 'section', 'video_link', 'study_material', 'description' in lecture table by making a post request.
3. '/lecture/fetch-lectures' - it fetches all the letures in lecture table by get request.
4. '/lecture/fetch-lecture/:id' - it fetch a particular lecture by its lecture id by get request.
5. '/lecture/fetch-lecture-topic/:id' - it fetches all the lectures that are under a particular topic id by get request. 
6. '/lecture/fetch-lecture-subject/:id' - it fetches all the lectures that are under a particular subject id by get request. 
7. '/lecture/update-lecture/:id' - it updates any field that you want to update in lecture table by making a PUT request by topic_id
8. '/lecture/delete-lecture/:id' - delete a particular lecture by its lecture id by DELETE request.
9. '/lecture/delete-lecture-topic/:id' - delete lectures by topic id by DELETE request.
10. '/lecture/delete-lectures-subject/:id' - delete lectures by subject id by DELETE request.

User Table 
1. '/user/create-user-table' - it creates a user table by making a get request. Scehma - 'CREATE TABLE user(user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128) NOT NULL, first_name VARCHAR(128) NOT NULL, last_name VARCHAR(128), city VARCHAR(64), state VARCHAR(64), country VARCHAR(64), address VARCHAR(1000), standard VARCHAR(256), subsrciption_type VARCHAR(128) , created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
2. '/user/add-user' - it insert 'username', 'first_name', 'last_name', 'city', 'state', 'country', 'address', 'standard', 'subscription_type' in user table by making POST request.
3. '/user/fetch-user/:id' - it fetches all the users in user table by get request.
4. '/user/fetch-users' - it fetch a particular user by its user id by get request.
5. '/user/update-user/:id' - it updates any field in user table by a particular user id by a PUT request.
6. '/user/delete-user/:id' - ir deletes a particular user from user table by DELETE request.


Question Bank Table 
1. '/question/create-question-bank' - it creates a question bank table by making a get request. Scehma - 'question_id INT AUTO_INCREMENT PRIMARY KEY, question TEXT NOT NULL, option1 VARCHAR(8000), option2 VARCHAR(8000), option3 VARCHAR(8000), option4 VARCHAR(8000), subject_id INT NOT NULL, topic_id INT NOT NULL, answer TEXT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (subject_id) REFERENCES subject(subject_id), FOREIGN KEY (topic_id) REFERENCES topic(topic_id)'
2. '/question/insert-question' - it insert 'question', 'option1', 'option2', 'option3', 'option4', 'subject_id', 'topic_id', 'answer' into question bank table by making POST request.
3. '/question/fetch-questions' - fetches all the question from table.
4. '/question/fetch-one-question/:id' - fetch one question with question id.
5. '/question/fetch-questions-topic/:id' - fetch all question under a topic id.
6. '/question/fetch-questions-subject/:id' - fetch all question under a subject id.
7. '/question/update-question/:id' - update any field under a particular question in table.
8. '/question/delete-question/:id' - delete a particular question with question id.
9. '/question/delete-questions-topic/:id' - delete set of questions with a topic id.
10. '/question/delete-questions-subject/:id' - delete all question with a particular subjectid.