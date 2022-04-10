# VMware-CompileAbhi

- We are going to build an online compiler. 
- Anyone can use this compiler to compile the code in their preferred language. 
- This online compiler can be used even if you do not have a high end computer, so anyone can use it to learn and practice coding without the need to spend a lot money. 
- Hence using this coding can also be propagated to resource restricted areas of India and the world. 

## Endpoints

| Type  |     Route      |                Path Parameters                |                                                                        Description                                                                         |
| :---: | :------------: | :-------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  GET  |       /        |                       -                       |                                                                  Check server is running                                                                   |
| POST  |     /user      | userId, Optional ( [name], [email], [dp url]) |                                      Add user information in database if user is signing up else return the user data                                      |
| POST  |    /publish    |             file, fileId, userId              |                                                     To update the changes of file in Firebase Storage                                                      |
| PATCH | /new-directory |          userId, directoryStructure           |                                               Update the directory sructure, when adding new file or folder                                                |
| POST  |  /submission   |              code, input (file)               |     Execute the code and returns the output and execution time in ms, else return error and type of error and its description    [Parameters in FILE]      |
| POST  |     /test      |              code, input (json)               | Execute the code and returns the output and execution time in ms, else return error and type of error and its description             [Parameters in JSON] | **** |