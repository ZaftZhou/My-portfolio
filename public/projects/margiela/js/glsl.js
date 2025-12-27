import * as THREE from './three.module.js';

THREE.ShaderChunk.cns_albedo_fragment = 
    '#ifdef USE_ALBEDO\n' + 
        'vec4 droppedA = calcFloating(v_model_normal, v_model_position);\n' + 
        'vec4 albedo_drop = calcDropped(droppedA, u_AlbedoMapRotation, u_AlbedoMapScale.xy);\n' + 
        'vec4 albedoA = texture2D( u_AlbedoMap, albedo_drop.xy );\n' + 
        'albedoA = mapAlbedoToLinear( albedoA );\n' + 
        'diffuseColor.rgb =  mix(albedoA.rgb*diffuse,(albedoA.r+albedoA.g+albedoA.b)/3.0*diffuseColor.rgb,u_mixColors);\n' + 
        'diffuseColor.a   =  mix(diffuseColor.a,diffuseColor.a*albedoA.a,u_mixAlpha);\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_albedo_pars_fragment = 
    '#ifdef USE_ALBEDO\n' + 
        'uniform sampler2D u_AlbedoMap;\n' + 
        'uniform vec3  u_AlbedoMapScale;\n' + 
        'uniform float u_AlbedoMapRotation;\n' + 
        'uniform float u_mixColors;\n' + 
        'uniform float u_mixAlpha;\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_clipping_planes_pars_fragment = 
    '#if NUM_CLIPPING_PLANES > 0\n' + 
    	'uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_clipping_planes_pars_vertex = '';

THREE.ShaderChunk.cns_color_fragment = 
'#ifdef USE_COLOR\n' + 
            'diffuseColor.rgb *= vColor.rgb;\n' + 
        '#else\n' + 
            'diffuseColor.rgb *= colorToLinear(vec4(uColor.rgb, 1.0)).rgb;\n' + 
        '#endif\n';
    /*'// hier bitte vec4 und als varying oder uniform' + 
    '#ifdef PSOL\n' + 
        '#ifdef USE_COLOR\n' + 
            'diffuseColor.rgb *= vColor.rgb;\n' + 
            'opacity           = vColor.a;\n' + 
            'diffuseColor.a = opacity;\n' + 
        '#else\n' + 
            'diffuseColor.rgb *= uColor.rgb * uColor.rgb;\n' + 
            'opacity           = uColor.a;\n' + 
            'diffuseColor.a = opacity;\n' + 
        '#endif\n' + 
    '#else\n' + 
        '#ifdef USE_COLOR\n' + 
            'diffuseColor.rgb *= vColor.rgb;\n' + 
        '#else\n' + 
            'diffuseColor.rgb *= colorToLinear(vec4(uColor.rgb, 1.0)).rgb;\n' + 
        '#endif\n' + 
    '#endif\n';*/

THREE.ShaderChunk.cns_color_pars_fragment = 
    '#ifdef PSOL\n' + 
        '// hier bitte vec4 und als varying oder uniform\n' + 
        '#ifdef USE_COLOR\n' + 
            'varying vec4 vColor;\n' + 
        '#else\n' + 
            'uniform vec4 uColor;\n' + 
        '#endif\n' + 
    '#else\n' + 
        '#ifdef USE_COLOR\n' + 
            'varying vec3 vColor;\n' + 
        '#else\n' + 
            'uniform vec3 u_color;\n' + 
        '#endif\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_color_pars_vertex = 
    '#ifdef PSOL\n' + 
    	'#ifdef USE_COLOR\n' + 
    		'varying vec4 vColor;\n' + 
    	'#endif\n' + 
    '#else\n' + 
    	'#ifdef USE_COLOR\n' + 
    		'varying vec3 vColor;\n' + 
    	'#endif\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_color_vertex = 
    '// hier bitte vec4 und als varying oder uniform\n' + 
    '#ifdef USE_COLOR\n' + 
    	'vColor.xyz = colorToLinear(vec4(color.xyz, 1.0)).xyz;\n' + 
    	'#ifdef PSOL\n' + 
    		'vColor.a = color.a;\n' + 
    	'#endif\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_cube_uv_reflection_fragment = 
    '#ifdef ENVMAP_TYPE_SINGLECUBE\n' + 
        'float pxBorderW  = 1.0 / 2048.0;\n' + 
        'float pxBorderH  = 1.0 / 2048.0;\n' + 
        'float pxBorderW2 = 1.0 / (2.0 * (512.0 + 9.0 * 2.0) * 1.5);\n' + 
        'float pxBorderH2 = 1.0 / (3.0 * (512.0 + 9.0 * 2.0));\n' + 
        
        'vec2 mapUVtoRect(vec2 uv, vec4 rect) {\n' + 
            'return rect.xy + uv * rect.zw;\n' + 
        '}\n' + 
        
        'vec4 removeBorder(vec4 rect, float b) {\n' + 
            'rect.x += b * pxBorderW;\n' + 
            'rect.y += b * pxBorderH;\n' + 
            'rect.z -= 2.0 * b * pxBorderW;\n' + 
            'rect.w -= 2.0 * b * pxBorderH;\n' + 
            'return rect;\n' + 
        '}\n' + 
        
        'vec4 pixelToUV(vec4 rect) {\n' + 
            'return vec4(rect.x * pxBorderW, rect.y * pxBorderH, rect.w * pxBorderW, rect.z * pxBorderH);\n' + 
        '}\n' + 
        
        'vec4 texture2DLod3(sampler2D lEnvMap, vec2 uv, vec4 rect, float lod) {\n' + 
            'vec4  rectP;\n' + 
            'float borderN   = u_textureLevels - 2.0;\n' + 
            'float borderN2  = borderN * 2.0;\n' + 
            'float fullsizeN = 512.0;\n' + 
            'float sizeN     = fullsizeN;\n' + 
        
            'if (lod < 1.0) {\n' + 
                'rectP.x = borderN;\n' + 
                'rectP.y = borderN;\n' + 
                'rectP.z = sizeN;\n' + 
                'rectP.w = sizeN;\n' + 
            '} else {\n' + 
                'float row   = 0.0;\n' + 
                'float baseS = 1.0;\n' + 
                'if (lod < 2.0) {\n' + 
                    'row   = 0.0;\n' + 
                    'baseS = 1.0;\n' + 
                '} else if (lod < 4.0) {\n' + 
                    'row   = 1.0;\n' + 
                    'baseS = 2.0;\n' + 
                '} else if (lod < 8.0) {\n' + 
                    'row   = 2.0;\n' + 
                    'baseS = 4.0;\n' + 
                '} else if (lod < 16.0) {\n' + 
                    'row   = 3.0;\n' + 
                    'baseS = 8.0;\n' + 
                '}\n' + 
                'sizeN /= (baseS * 2.0);\n' + 
                'float s = floor(lod) - baseS;\n' + 
                'rectP.x = fullsizeN + borderN2 + (1.0 + sizeN + 1.0) * s + 1.0;\n' + 
                'rectP.y = borderN2 - 1.0 - row * 2.0 + sizeN;\n' + 
                'rectP.z = sizeN;\n' + 
                'rectP.w = sizeN;\n' + 
            '}\n' + 
            'rectP = pixelToUV(rectP);\n' + 
            'rect.xy += rectP.xy;\n' + 
            'rect.zw = rectP.zw;\n' + 
            'return texture2D(lEnvMap, mapUVtoRect(uv, rect));\n' + 
        '}\n' + 
        
        'vec4 texture2DLod2(sampler2D lEnvMap, vec2 uv, vec4 rect, float lod) {\n' + 
            'vec4 v1 = texture2DLod3(lEnvMap, uv, rect, floor(lod));\n' + 
            'vec4 v2 = texture2DLod3(lEnvMap, uv, rect, floor(lod + 1.0));\n' + 
            'return mix(v1, v2, lod - floor(lod));\n' + 
        '}\n' + 
        
        'vec4 textureCubeLod2(sampler2D lEnvMap, vec3 reflectionVector, float lod) {\n' + 
            'float x    = reflectionVector.x;\n' + 
            'float y    = reflectionVector.y;\n' + 
            'float z    = reflectionVector.z;\n' + 
            'float absX = abs(x);\n' + 
            'float absY = abs(y);\n' + 
            'float absZ = abs(z);\n' + 
            'float indexU, indexV;\n' + 
        
            'float isXPositive = x > 0.0 ? -1.0 : 1.0;\n' + 
            'float isYPositive = y > 0.0 ? -1.0 : 1.0;\n' + 
            'float isZPositive = z > 0.0 ? 1.0 : -1.0;\n' + 
            
            'float maxAxis, u, v, uc, vc;\n' + 
        
            '// X\n' + 
            'if (absX >= absY && absX >= absZ) {\n' + 
                'maxAxis = absX;\n' + 
                'uc      = z * isXPositive;\n' + 
                'vc      = y;\n' + 
                'indexV  = 2.0 / 3.0;\n' + 
                'if (isXPositive < 0.0) { indexU = 0.0; } else { indexU = 1.0 / 2.0; }\n' + 
            '}\n' + 
            '// Y\n' + 
            'else if (absY >= absX && absY >= absZ) {\n' + 
                'maxAxis = absY;\n' + 
                'uc      = x;\n' + 
                'vc      = z * isYPositive;\n' + 
                'indexV  = 1.0 / 3.0;\n' + 
                'if (isYPositive < 0.0) { indexU = 0.0; } else { indexU = 1.0 / 2.0; }\n' + 
            '}\n' + 
            '// Z\n' + 
            'else if (absZ >= absX && absZ >= absY) {\n' + 
                'maxAxis = absZ;\n' + 
                'uc      = x * isZPositive;\n' + 
                'vc      = y;\n' + 
                'indexV  = 0.0 / 3.0;\n' + 
                'if (isZPositive > 0.0) { indexU = 0.0; } else { indexU = 1.0 / 2.0; }\n' + 
            '}\n' + 
        
            '// Convert range from -1 to 1 to 0 to 1\n' + 
            'u = 0.5 * (uc / maxAxis + 1.0);\n' + 
            'v = 0.5 * (vc / maxAxis + 1.0);\n' + 
            
            'float fw = pxBorderW / pxBorderW2;\n' + 
            'float fh = pxBorderH / pxBorderH2;\n' + 
            
            'return texture2DLod2(lEnvMap, vec2(u, v), vec4(indexU * fw, indexV * fh + (((1.0 / pxBorderH) - (1.0 / pxBorderH2)) * pxBorderH), 1.0 / 2.0 * fw, 1.0 / 3.0 * fh), lod);\n' + 
        '}\n' + 
    '#endif\n' + 
    
    'vec4 textureCubeUV1( sampler2D envMap, vec3 reflectionVector, float roughness ) {\n' + 
        '#ifdef LIGHT\n' + 
            '#ifdef ENVMAP_TYPE_CUBE\n' + 
                'float levels     = u_textureLevels - 1.0;\n' + 
                'float roughness2 = (roughness);\n' + 
                'vec4  v1         = textureCubeLod(u_envMap, vec3(reflectionVector.x, reflectionVector.y, reflectionVector.z), floor(roughness2) + 1.0).rgba;\n' + 
                'vec4  v2         = textureCubeLod(u_envMap, vec3(reflectionVector.x, reflectionVector.y, reflectionVector.z), floor(roughness2)).rgba;\n' + 
                'v1               = envMapTexelToLinear(v1);\n' + 
                'v2               = envMapTexelToLinear(v2);\n' + 
                'return mix(v2, v1, roughness2 - floor(roughness2));\n' + 
        
            '#endif\n' + 
            '#ifdef ENVMAP_TYPE_SPHERE\n' + 
                'float levels     = u_textureLevels - 1.0;\n' + 
                'float roughness2 = (roughness);\n' + 
                'float m          = 2.0;\n' + 
                'vec2  sphere_map = vec2(reflectionVector.x / m + 0.5, reflectionVector.y / m + 0.5);\n' + 
                'vec4  ret        = texture2D(u_envMap, sphere_map.xy, roughness2).rgba;\n' + 
                'ret              = envMapTexelToLinear(ret);\n' + 
                'return ret;\n' + 
            '#endif\n' + 
        
            '#ifdef ENVMAP_TYPE_SINGLECUBE\n' + 
                'float levels     = u_textureLevels - 2.0;\n' + 
                'float roughness2 = (roughness);\n' + 
                'vec4 ret= textureCubeLod2(u_envMap, reflectionVector, roughness2).rgba;\n' + 
                'ret              = envMapTexelToLinear(ret);\n' + 
                'return ret;\n' + 
        
            '#endif\n' + 
        '#endif\n' + 
        'return vec4(1.0);\n' + 
    '}\n';

THREE.ShaderChunk.cns_envmap_physical_pars_fragment = 
    '#ifdef USE_IDENTITY_VIEW_MATRIX\n' + 
        'mat4 _viewMatrix = mat4(1.0);\n' + 
    '#else\n' + 
        '#define _viewMatrix viewMatrix\n' + 
    '#endif\n' + 
    
    '#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n' + 
    	'vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n' + 
    		'vec3 worldNormal = inverseTransformDirection( geometry.normal, _viewMatrix );\n' + 
    		'#ifdef ENVMAP_TYPE_CUBE\n' + 
    			'vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n' + 
    
    			'// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n' + 
    			'// of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n' + 
    
    			'#ifdef TEXTURE_LOD_EXT\n' + 
    				'vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n' + 
    			'#else\n' + 
    				'// force the bias high to get the last LOD level as it is the most blurred.\n' + 
    				'vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n' + 
    			'#endif\n' + 
    
    			'envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n' + 
    		'#elif defined( ENVMAP_TYPE_CUBE_UV )\n' + 
    			'vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n' + 
    			'vec4 envMapColor = textureCubeUV( envMap, queryVec, float( maxMIPLevel ) );\n' + 
    		'#else\n' + 
    			'vec4 envMapColor = vec4( 0.0 );\n' + 
    		'#endif\n' + 
    
    		'return PI * envMapColor.rgb * envMapIntensity;\n' + 
    	'}\n' + 
    
    	'// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n' + 
    	'float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n' + 
    		'float maxMIPLevelScalar = float( maxMIPLevel );\n' + 
    		'float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n' + 
    
    		'// clamp to allowable LOD ranges.\n' + 
    		'return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n' + 
    	'}\n' + 
    
    	'vec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n' + 
    		'#ifdef ENVMAP_MODE_REFLECTION\n' + 
    			'vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n' + 
    		'#else\n' + 
    			'vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n' + 
    		'#endif\n' + 
    
    		'reflectVec = inverseTransformDirection( reflectVec, _viewMatrix );\n' + 
    		'float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n' + 
    
    		'#ifdef ENVMAP_TYPE_CUBE\n' + 
    			'vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n' + 
    
    			'#ifdef TEXTURE_LOD_EXT\n' + 
    				'vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n' + 
    			'#else\n' + 
    				'vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n' + 
    			'#endif\n' + 
    
    			'envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n' + 
    		'#elif defined( ENVMAP_TYPE_CUBE_UV )\n' + 
    			'vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n' + 
    			'vec4 envMapColor = textureCubeUV( envMap, queryReflectVec, specularMIPLevel);\n' + 
    		'#elif defined( ENVMAP_TYPE_EQUIREC )\n' + 
    			'vec2 sampleUV;\n' + 
    			'sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n' + 
    			'sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n' + 
    
    			'#ifdef TEXTURE_LOD_EXT\n' + 
    				'vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n' + 
    			'#else\n' + 
    				'vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n' + 
    			'#endif\n' + 
    
    			'envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n' + 
    		'#elif defined( ENVMAP_TYPE_SPHERE )\n' + 
    			'vec3 reflectView = normalize( ( _viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n' + 
    
    			'#ifdef TEXTURE_LOD_EXT\n' + 
    				'vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n' + 
    			'#else\n' + 
    				'vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n' + 
    			'#endif\n' + 
    
    			'envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n' + 
    		'#endif\n' + 
    
    		'return envMapColor.rgb * envMapIntensity;\n' + 
    	'}\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_map_fragment = 
    '#ifdef USE_TEXTURE\n' + 
        'vec4 texelColor = texture2D( Texture0, vUv );\n' + 
        'texelColor = mapTexelToLinear( texelColor );\n' + 
        'diffuseColor *= texelColor;\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_normal_fragment_maps = 
    '#ifdef USE_NORMALMAP_DEFUNK\n' + 
    	'#ifdef OBJECTSPACE_NORMALMAP\n' + 
    		'normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n' + 
    		'#ifdef FLIP_SIDED\n' + 
    			'normal = - normal;\n' + 
    		'#endif\n' + 
    		'#ifdef DOUBLE_SIDED\n' + 
    			'normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n' + 
    		'#endif\n' + 
    
    		'normal = normalize( normalMatrix * normal );\n' + 
    	'#else\n' + 
    		'normal = perturbNormal2Arb( -vViewPosition, normal );\n' + 
    	'#endif\n' + 
    '#elif defined( USE_BUMPMAP )\n' + 
    	'normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n' + 
    '#endif\n' + 
    '// mein Code\n' + 
    
    '#if defined(USE_NORMALMAP) || defined(USE_ALBEDO) || defined(USE_METALLROUGHNESS)\n' + 
        'vec4 dropped = calcFloating(v_model_normal, v_model_position);\n' + 
    	'#if defined(USE_NORMALMAP)\n' + 
    		'vec4 normal_drop = calcDropped(dropped, u_NormalMapRotation, u_NormalMapScale.xy);\n' + 
    		'normalT.rgb      = texture2D(u_NormalMap, normal_drop.xy).rgb;\n' + 
    		
    		'normalT = normalize(vec3(vec2(normalT.xy * 2.0 - vec2(1.0)), normalT.z));\n' + 
    		'float a_pi = u_NormalMapRotation / 180.0 * PI;\n' + 
    		'normalT.xy*=normal_drop.zw;\n' + 
    		'normalT.xy = vec2( cos(a_pi)*normalT.x - sin(a_pi)*normalT.y, cos(a_pi)*normalT.y + sin(a_pi)*normalT.x);\n' + 
    		
    		'mat3 tsn=getTSN( v_model_normal, normalMatrix );\n' + 
    	'normal = mapNormal(tsn, normalT, -u_NormalMapScale.z);\n' + 
    	'#endif\n' + 
    '#endif\n';

THREE.ShaderChunk.cns_normalmap_pars_fragment = 
    '#ifndef FLAT_SHADED\n' + 
        '#ifdef LIGHT\n' + 
            '#if defined(USE_NORMALMAP) || defined(USE_ALBEDO) || defined(USE_METALLROUGHNESS)\n' + 
                'varying vec3 v_model_normal;\n' + 
                'varying vec3 v_model_position;\n' + 
    
                '#if defined(USE_NORMALMAP) || defined(USE_METALLROUGHNESS)\n' + 
                    'uniform sampler2D u_NormalMap;\n' + 
        			'uniform vec3  u_NormalMapScale;\n' + 
    				'uniform float u_NormalMapRotation;\n' + 
    			
                    'vec3 mapNormal(mat3 tsn, vec3 normal, float f) {\n' + 
                        'normal = normalize(vec3(normal.xy * f, normal.z));\n' + 
                        'return normalize( tsn * normal );\n' + 
                    '}\n' + 
    			'#endif\n' + 
    
    			'vec4 calcFloating(vec3 viewDir, vec3 position2) {\n' + 
    				'vec4 dropped  = vec4(0.0,0.0,1.0,1.0);\n' + 
    				'vec3 viewDir2 = abs(viewDir);\n' + 
    				'if (viewDir2.z >= viewDir2.y && viewDir2.z >= viewDir2.x) {\n' + 
    					'dropped.xy                      = position2.yx;\n' + 
    					'if (viewDir.z > 0.0) {\n' + 
    						'dropped.y = -dropped.y;\n' + 
    						'dropped.w = -dropped.w;\n' + 
    					'} else { dropped.w = -dropped.w; }\n' + 
    				'} else if (viewDir2.y >= viewDir2.z && viewDir2.y >= viewDir2.x) {\n' + 
    					'dropped.xy                      = position2.zx;\n' + 
    					'if (viewDir.y < 0.0) {\n' + 
    						'dropped.y = -dropped.y;\n' + 
    						'dropped.w = -dropped.w;\n' + 
    					'}else { dropped.w = -dropped.w; }\n' + 
    				'} else if (viewDir2.x >= viewDir2.z && viewDir2.x >= viewDir2.y) {\n' + 
    					'dropped.xy                      = position2.zy;\n' + 
    					'if (viewDir.x > 0.0) {\n' + 
    						'dropped.y = -dropped.y;\n' + 
    						'dropped.w = -dropped.w;\n' + 
    					'}else { dropped.w = -dropped.w; }\n' + 
    				'}\n' + 
    				'return dropped;\n' + 
    			'}\n' + 
    			'vec3 getNormalFloatingY(vec3 viewDir) {\n' + 
    				'vec3 ret=vec3(0.0);\n' + 
    				'vec3 viewDir2 = abs(viewDir);\n' + 
    				'if (viewDir2.z > viewDir2.y && viewDir2.z > viewDir2.x) {\n' + 
    					'ret.x=1.0;\n' + 
    					'if (viewDir.z > 0.0) {      ret.x=-1.0;    }\n' + 
    				'} else if (viewDir2.y > viewDir2.z && viewDir2.y > viewDir2.x) {\n' + 
    					'ret.x=1.0;\n' + 
    					'if (viewDir.y < 0.0) {      ret.x=-1.0;    }\n' + 
    				'} else if (viewDir2.x > viewDir2.z && viewDir2.x > viewDir2.y) {\n' + 
    					'ret.y=1.0;\n' + 
    					'if (viewDir.x > 0.0) {      ret.y=-1.0;    }\n' + 
    				'}\n' + 
    				'return ret;\n' + 
    			'}\n' + 
    			
    			'mat3 getTSN( vec3 normal, mat3 normalMatrix ) {\n' + 
    					'vec3 vz = normal;\n' + 
    					'vec3 vy = getNormalFloatingY(normal);\n' + 
    					'vec3 vx = normalize(cross(vz, vy));\n' + 
    					'vy      = normalize(cross(vx, vz));\n' + 
    					'return normalMatrix*mat3(vy,vx,vz);\n' + 
    			'}\n' + 
    
    			'vec4 mapToRepeatUV(vec4 dropped) {\n' + 
    				'dropped.x = dropped.x - floor(dropped.x);\n' + 
    				'dropped.y = dropped.y - floor(dropped.y);\n' + 
    				'return dropped;\n' + 
    			'}\n' + 
    
    			'vec4 roatateUV(vec4 dropped, float a_deg) {\n' + 
    				'float a_pi = a_deg / 180.0 * PI;\n' + 
    				'dropped.xy    = vec2(dropped.x * sin(a_pi) - dropped.y * cos(a_pi), dropped.x * cos(a_pi) + dropped.y * sin(a_pi));\n' + 
    				'return dropped;\n' + 
    			'}\n' + 
    
    			'vec4 calcDropped(vec4 dropped, float a_deg, vec2 scale) {\n' + 
    				'vec4 ret = roatateUV(dropped, a_deg);\n' + 
    				'return ret / vec4(scale.x,scale.y,1.0,1.0);\n' + 
    			'}\n' + 
    		'#endif\n' + 
    	'#endif\n' + 
    '#endif\n';