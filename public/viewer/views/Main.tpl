{Template {
	$classpath:'viewer.views.Main',
	$hasScript: true,
	$css: ['viewer.views.Style'],
	$dependencies: [
		'aria.utils.Object'
	]
}}
	{macro main()}
		<div class="header">
			<h5><strong>Sample</strong> ${$data.title}</h5>
			<div class="actions">
				{if isFramed()}
				<a class="tab" title="Open this sample in a new tab" target="_blank" href="${url}"></a>
				{/if}
				<div class="run" title="Run this sample!" {on click "run"/}></div>
				{if $data.data }
				<div class="data" title="View Data model" {on click "datamodel"/}></div>
				{/if}
				<div class="sources" title="View Sources files" {on click "sources"/}></div>
			</div>
		</div>

		{section {
			id: "content",
			type: 'div',
			cssClass: "content",
			bindRefreshTo: [
				{ inside: $data, to: "view" },
				{ inside: $data, to: "loading" }
			],
			macro: "content"
		}/}
	{/macro}


	{macro content()}
		{if $data.callout}
		<div class="callout">${$data.callout}</div>
		{/if}
		{if !$data.loading}
			{section {
				id: "contentwrapper",
				type: 'div',
				attributes:{
					classList: [$data.view]
				},
				macro: $data.view
			}/}
		{else/}
			{call load()/}
		{/if}
	{/macro}


	{macro load()}
		{@aria:Gauge {
			minValue: 0,
			maxValue: $data.sources.length === 1 ? 100 : ($data.sources.length - 1) * 100,
			currentValue: 0,
			gaugeWidth: 400,
			block: true,
			bind: {
				'currentValue': { inside: $data, to: 'loaded_sources_count', transform: {
					toWidget: function(value) {
					return value * 100;
					}
				}}
			}
		}/}
	{/macro}



	{macro result()}
		{if !$data.moduleCtrl}
			{@html:Template {
				classpath: $data.template,
				type: "div"
			}/}
		{else/}
			{@html:Template {
				classpath: $data.template,
				moduleCtrl: {
					classpath: $data.moduleCtrl
				},
				type: "div"
			}/}
		{/if}
	{/macro}

	{macro sources()}
		<h6>Available source files</h6>
		<ul>
		{foreach file inArray $data.sources}
			{var type = getFileType(file)/}
			<li {on click { fn: "source", scope: this, args: file }/}
				class="{if type.cssClass !== false}${type.cssClass}{/if} ${sourcesListOddEven(file_index)}"
				>${file}
				{if type.name !== false}
				<span class="type">${type.name}</span>
				{/if}
			</li>
		{/foreach}
		</ul>
	{/macro}

	{macro datamodel()}
		<div class="mw-geshi">
			<div class="javascript source-javascript">
				${indentDataModel(data)}
			</div>
		</div>
	{/macro}

	{macro source()}
		{if ($data.selected_source !== false)}
			{if ($data.sources.length > 1)}
				<div class="files" title="View the other files" {on click "sources"/}></div>
			{/if}
			<h6>${getFileName($data.selected_source)}</h6>
			<div class="snippet">
				${$data.loaded_sources[$data.selected_source]}
			</div>
		{/if}
	{/macro}

{/Template}
