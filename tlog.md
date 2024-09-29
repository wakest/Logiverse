---

    title: TLOG™
    description: My Interesting Posts.

---

# The markdown [TLOG™](/tlog/tlog)

These are my posts aren't they so cool. Filtering will be soon. Also heres a [link to the main page](/) in case you want it. The tag system for this website is very rudimentary and janky however it works so that's all that matters.

## Posts

<div style="display:flex;gap:.5em;padding-bottom:1em">
{% for tag in site.tags %}
<label class="tag">
    <input onchange="rerender(this)" type="checkbox" data-tag="{{tag[0]}}" checked>{{tag[0]}}
</label>
{% endfor %}
</div>

<div id="postsbox">
{% for post in site.posts %}
<a href="{{ post.url }}" title="{{post.date | date_to_string}}">{{ post.title }}</a>
{% endfor %}
</div>

<style>
    #postsbox{
        display:flex;
        flex-direction: column;
        gap: .5em;
        & > a {
            width: fit-content;
        }
    }
    .tag {
        padding:0 1em 0 .5em;
        border-radius:999px;
        background-color:var(--primary);
        display:flex;
        align-items:center;
        width:fit-content;
    }
    .tag:not(:has(input:checked)){
        filter: grayscale(1)
    }
</style>

<script>
    /*
     *  
     *  TODO: Clean this up please
     *
     */
    const tlogs = [
            {% for post in site.posts %}
                {
                    "title": "{{ post.title | escape }}",
                    "tags": [
                        {% for tag in post.tags %}
                            "{{tag}}"
                            {% unless forloop.last %},{% endunless %}
                        {% endfor %}
                    ],
                    "url": "{{ site.baseurl }}{{ post.url }}",
                    "date": "{{ post.date | date_to_string }}"
                } {% unless forloop.last %},{% endunless %}
            {% endfor %}
        ]

    const tags = {
        {% for tag in site.tags %}
                "{{tag[0]}}": true,
        {% endfor %}
    }

    function rerender(e){

        tags[e.getAttribute('data-tag')] = e.checked

        let filtered = tlogs.filter(tlog => Object.keys(Object.fromEntries(Object.entries(tags).filter(([k,v])=>v))).some(t=>tlog.tags.includes(t)))
        
        postsbox.innerHTML = filtered.map(tlog => `
            <a href="${tlog.url}" title="${tlog.date}">${tlog.title}</a>
        `).join('') || 'No posts matched that'
        
    }
</script>