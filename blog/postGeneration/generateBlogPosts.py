import frontmatter
import markdown
import os

MAIN_PAGE_GENERATION_OUTPUT_DIR = ".."
POST_GENERATION_OUTPUT_DIR = "../posts"

POST_RELATIVE_URL_PREFIX = "./posts"
POST_SOURCE_DIR_NAME = "postSources"

MAIN_PAGE_TEMPLATE_FILE_NAME = "mainPageTemplate.html"
POST_TEMPLATE_FILE_NAME = "blogPostTemplate.html"
STYLE_PLACEHOLDER = "/*style_placeholder*/"
STYLE_FRONTMATTER_FIELD = "customStyle"
CONTENT_PLACEHOLDER = "<!--content_placeholder-->"
INDEX_FILE_NAME = "index.html"

ENTRY_LINK_PLACEHOLDER = "$link_placeholder"
ENTRY_TITLE_PLACEHOLDER = "$title_placeholder$"
ENTRY_DESCRIPTION_PLACEHOLDER = "$description_placeholder$"
ENTRY_DATE_PLACEHOLDER = "$date_placeholder$"
MAIN_PAGE_ENTRY_TEMPLATE = f"""\
<a href="{ENTRY_LINK_PLACEHOLDER}">
    <div class="blogPost">
        <div class="rightSide">
            <p class="date">{ENTRY_DATE_PLACEHOLDER}</p>
        </div>
        <div class="leftSide">
            <h5 class="title">{ENTRY_TITLE_PLACEHOLDER}</h5>
            <p class="description">{ENTRY_DESCRIPTION_PLACEHOLDER}</p>
        </div>
    </div>
</a>
"""

def main():
    template_files = filterListForSuffix(os.listdir("."), ".html")

    if POST_TEMPLATE_FILE_NAME not in template_files:
        raise FileNotFoundError("Post template file not found!")
    if MAIN_PAGE_TEMPLATE_FILE_NAME not in template_files:
        raise FileNotFoundError("Main page template file not found!")

    file = open(POST_TEMPLATE_FILE_NAME, "r")
    post_template = file.read()
    file.close()
    file = open(MAIN_PAGE_TEMPLATE_FILE_NAME, "r")
    main_page_template = file.read()
    file.close()

    markdown_files = filterListForSuffix(os.listdir(POST_SOURCE_DIR_NAME), ".md")
    markdown_files.reverse()

    main_page_entries = []

    for markdown_file_name in markdown_files:
        
        # Read post file and parse as markdown + YAML frontmatter 
        relative_markdown_file_path = "/".join([POST_SOURCE_DIR_NAME, markdown_file_name])
        with open(relative_markdown_file_path, "r") as file:
            post_object = frontmatter.load(file)

        # Generate post content 
        post_html_content = generate_blog_post(post_object, post_template)

        # Write generated post content to its dedicated directory
        post_page_name = markdown_file_name[:-3]
        post_dir_relative_path = "/".join([POST_GENERATION_OUTPUT_DIR, post_page_name])
        post_file_relative_path = "/".join([post_dir_relative_path, INDEX_FILE_NAME])

        # Generate post entry
        main_page_entries.append(generate_main_page_entry(post_object, post_page_name))

        os.makedirs(post_dir_relative_path, exist_ok=True)

        with open(post_file_relative_path, "w") as file:
            file.write(post_html_content)

    main_page_content = main_page_template.replace(CONTENT_PLACEHOLDER, "\n".join(main_page_entries))

    main_page_file_name = "/".join([MAIN_PAGE_GENERATION_OUTPUT_DIR, INDEX_FILE_NAME])
    with open(main_page_file_name, "w") as file:
            file.write(main_page_content)

def generate_main_page_entry(post, post_page_name):
    title = post.get("title")
    description = post.get("description")
    date = post.get("date")

    post_relative_url = "/".join([POST_RELATIVE_URL_PREFIX, post_page_name]) 

    return MAIN_PAGE_ENTRY_TEMPLATE \
        .replace(ENTRY_LINK_PLACEHOLDER, post_relative_url) \
        .replace(ENTRY_TITLE_PLACEHOLDER, title) \
        .replace(ENTRY_DESCRIPTION_PLACEHOLDER, description) \
        .replace(ENTRY_DATE_PLACEHOLDER, date)

def generate_blog_post(post, template):
    html_body = markdown.markdown(post.content)
    post_html = template.replace(CONTENT_PLACEHOLDER, html_body)
    if (post.get(STYLE_FRONTMATTER_FIELD)):
        post_html = post_html.replace(STYLE_PLACEHOLDER, post.get(STYLE_FRONTMATTER_FIELD))
    return post_html

def filterListForSuffix(string_list, suffix):
    return list(filter(lambda fileName: fileName.endswith(suffix), string_list))

main()