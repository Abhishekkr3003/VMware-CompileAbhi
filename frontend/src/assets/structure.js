const structure = [
    {
      type: "folder",
      name: "src",
      childrens: [
        {
          type: "folder",
          name: "Components",
          childrens: [
            { type: "file", name: "Modal.c" },
            { type: "file", name: "Modal.cpp" }
          ]
        },
        { type: "file", name: "index.py" },
        { type: "file", name: "index.c" }
      ]
    },
    { type: "file", name: "package.json" }
];

export default structure;