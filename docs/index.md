---
layout: default
---

ADRJS is a Node implementation of npryce's [adr-tools](https://github.com/npryce/adr-tools).

Many teams use a mix of operating systems, and they need to use different tools
to achieve the same job.

For those teams that work with node, this package serves as a single command
that can be added in `devDependencies`, or invoked via `npx`, and maintain a
consistent experience across platforms.

# Usage

### Initialisation

Set a folder to store your decisions
```shell
npx adrjs init PATH
```

> Example:
> ```shell
npx adrjs init docs/adr
```

### Create a new decision

```shell
npx adrjs new TITLE
```

> Example:
> ```shell
npx adrjs new We will do things this way
```


# Decision Records for ADRJS

Decisions taken in this project.

<ol>
{% for decision in site.data.adr %}
<li><a href='{{ decision.url }}'>{{ decision.title }}</a></li>
{% endfor %}
</ol>
