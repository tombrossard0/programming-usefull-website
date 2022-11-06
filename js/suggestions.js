let suggestions = [];

let folder_link_github = "https://api.github.com/repos/tombrossard0/programming-usefull/contents/C";

fetch(folder_link_github)
  .then((response) => response.json())
  .then((data) => get_suggestions_from_github_repo(data));

function remove_extension(file)
{
    file.name = file.name.replace(".c", "");
}

function get_suggestions_from_github_repo(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.endsWith('.c'))
        {
            remove_extension(data[i]);
            suggestions.push(data[i].name);
        }
    }
}