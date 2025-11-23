<script lang="ts">
	import { DocLayout } from '$lib';
	import MermaidChart from '$lib/components/MermaidChart.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	// Example flowchart
	const flowchartExample = `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix Issues]
    E --> B
    C --> F[End]`;

	// Example sequence diagram
	const sequenceDiagramExample = `sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database

    User->>Browser: Enter URL
    Browser->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Data
    Server-->>Browser: HTTP Response
    Browser-->>User: Display Page`;

	// Example class diagram
	const classDiagramExample = `classDiagram
    class DocsConfig {
        +String title
        +String description
        +NavigationConfig navigation
        +ThemeConfig theme
        +validate()
    }
    class ThemeConfig {
        +String primaryColor
        +String secondaryColor
        +String fontFamily
    }
    class NavigationConfig {
        +Array~NavigationItem~ items
        +Boolean showSearch
    }
    DocsConfig --> ThemeConfig
    DocsConfig --> NavigationConfig`;

	// Example gantt chart
	const ganttExample = `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements       :a1, 2024-01-01, 7d
    Design             :a2, after a1, 10d
    section Development
    Frontend           :a3, after a2, 14d
    Backend            :a4, after a2, 14d
    section Testing
    Integration Tests  :a5, after a3 a4, 7d
    UAT                :a6, after a5, 5d`;

	// Usage example code
	const usageExample = `<script>
  import { MermaidChart } from '@keenmate/svelte-docs';

  const myChart = \`flowchart TD
    A[Start] --> B[Process]
    B --> C[End]\`;
<\/script>

<MermaidChart
  chartDefinition={myChart}
  titleText="My Flowchart"
  themeType="dark"
/>`;
</script>

<svelte:head>
	<title>Mermaid Charts Demo</title>
</svelte:head>

<DocLayout titleText="Mermaid Charts Demo">
	<h1>Mermaid Charts Demo</h1>
	<p class="lead">
		Interactive diagram and chart rendering using Mermaid.js in the documentation framework.
	</p>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Flowchart Example</h2>
		<p>A simple decision flowchart demonstrating conditional logic:</p>

		<MermaidChart chartDefinition={flowchartExample} titleText="Decision Flowchart" />

		<h5>Chart Definition:</h5>
		<CodeBlock codeContent={flowchartExample} languageType="mermaid" />
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Sequence Diagram Example</h2>
		<p>Visualizing the interaction between user, browser, server, and database:</p>

		<MermaidChart
			chartDefinition={sequenceDiagramExample}
			titleText="HTTP Request Flow"
		/>

		<h5>Chart Definition:</h5>
		<CodeBlock codeContent={sequenceDiagramExample} languageType="mermaid" />
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Class Diagram Example</h2>
		<p>Representing the relationship between configuration classes:</p>

		<MermaidChart
			chartDefinition={classDiagramExample}
			titleText="Configuration Architecture"
		/>

		<h5>Chart Definition:</h5>
		<CodeBlock codeContent={classDiagramExample} languageType="mermaid" />
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Gantt Chart Example</h2>
		<p>Project timeline with phases and dependencies:</p>

		<MermaidChart chartDefinition={ganttExample} titleText="Project Schedule" />

		<h5>Chart Definition:</h5>
		<CodeBlock codeContent={ganttExample} languageType="mermaid" />
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Chart Without Title</h2>
		<p>Charts can also be rendered without a title header:</p>

		<MermaidChart chartDefinition={`flowchart LR
    A[Input] --> B[Process]
    B --> C[Output]`} />
	</section>

	<hr class="my-4" />

	<section class="mb-5">
		<h2>Component Properties</h2>
		<p>The <code>MermaidChart</code> component accepts the following properties:</p>

		<ul>
			<li>
				<code>chartDefinition</code> (required) - The Mermaid diagram definition string
			</li>
			<li>
				<code>titleText</code> (optional) - Title displayed in the chart header
			</li>
			<li>
				<code>themeType</code> (optional) - Theme for the chart: 'default', 'dark' (default), 'forest', or 'neutral'
			</li>
		</ul>

		<h5>Usage Example:</h5>
		<CodeBlock
			codeContent={usageExample}
			languageType="svelte"
			titleText="Component Usage"
		/>
	</section>
</DocLayout>
