---
layout: default
---

ADRJS is a Node implementation of
npryce's [adr-tools](https://github.com/npryce/adr-tools).

Many teams use a mix of operating systems, and they need to use different tools
to achieve the same job.

For those teams that work with node, this package serves as a single command
that can be added in `devDependencies`, or invoked via `npx`, in order to
maintain a consistent experience across platforms.

# Usage

### Initialisation

Set a folder to store your decisions
```shell
npx adrjs init PATH
```

> Example:
> ```shell
> npx adrjs init docs/adr
> ```

### Create a new decision

```shell
npx adrjs new TITLE
```

> Example:
> ```shell
> npx adrjs new We will do things this way
> ```

### Amend a decision

```shell
npx adrjs -a INDEX TITLE
npx adrjs -amend INDEX TITLE
npx adrjs -amends INDEX TITLE
```

> Example:
> ```shell
> npx adrjs -a 13 We will do things a slightly different way
> ```

### Supersede a decision

```shell
npx adrjs -s INDEX TITLE
npx adrjs -supersede INDEX TITLE
npx adrjs -supersedes INDEX TITLE
```

> Example:
> ```shell
> npx adrjs -s 13 We will do things a completely different way
> ```

### Version

Get the tool version

```shell
npx adrjs version
```

# Decision Records for ADRJS

Decisions taken in this project.

<ol>
{% for decision in site.data.adr %}
<li><a href='{{ decision.url }}'>{{ decision.title }}</a></li>
{% endfor %}
</ol>

# License

The software and website are licensed under [MIT](https://mit-license.org/). The
Owl logo was found at [GeekSVGs](https://www.geeksvgs.com/id/38285) and is
licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
