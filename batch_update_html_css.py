import os
import re

CSS_LINK = '<link rel="stylesheet" href="css/global.css">\n'

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if CSS link is already present
    if CSS_LINK.strip() in content:
        print(f"Already updated: {filepath}")
        return

    # Find the <head> tag and insert the CSS link right after it
    updated = re.sub(r'(<head[^>]*>)', r'\1\n' + CSS_LINK, content, count=1)

    # Optionally: Remove existing <style> blocks that match the global.css rules
    # Uncomment below if you want to auto-remove all <style> blocks
    # updated = re.sub(r'<style[\s\S]*?</style>', '', updated, flags=re.MULTILINE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"Updated: {filepath}")

def batch_update(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.html'):
                filepath = os.path.join(dirpath, filename)
                update_html_file(filepath)

if __name__ == "__main__":
    # Set this to the root of your PTMeasures repo
    repo_root = "."
    batch_update(repo_root)
