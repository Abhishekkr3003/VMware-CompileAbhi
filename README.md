# VMware-CompileAbhi

- We are going to build an online compiler. 
- Anyone can use this compiler to compile the code in their preferred language. 
- This online compiler can be used even if you do not have a high end computer, so anyone can use it to learn and practice coding without the need to spend a lot money. 
- Hence using this coding can also be propagated to resource restricted areas of India and the world. 

## Endpoints

|  Type  |    Route     |                Path Parameters                |                                              Description                                               |
| :----: | :----------: | :-------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|  GET   |      /       |                       -                       |                                        Check server is running                                         |
|  POST  |    /user     | userId, Optional ( [name], [email], [dp url]) |            Add user information in database if user is signing up else return the user data            |
|  POST  |  /add-file   |       type, name, code, fileId, userId        |                               Adds new file in the directory of the user                               |
|  POST  |  /read-file  |                userId, fileId                 |                            Read the code and other mata-data about the file                            |
| PATCH  | /update-file |       type, name, code, fileId, userId        |                           Updates the code and the meta-data about the file                            |
| DELETE | /delete-file |       type, name, code, fileId, userId        |                          Deletes the file and the metadata from the database                           |
|  POST  | /submission  |                  code, input                  | Executes the code and return output of code if no error occured otherwise returns description of error |
|  POST  |  /directory  |                    userId                     |                              Fetches the directory structure of the user                               | **** |