# Generated migration for Crop Intelligence expansion
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SoilReport',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file_name', models.CharField(max_length=255)),
                ('file_path', models.CharField(blank=True, max_length=512)),
                ('parsed_data', models.JSONField(default=dict)),
                ('confidence_data', models.JSONField(default=dict)),
                ('raw_snippets', models.TextField(blank=True)),
                ('is_verified_by_user', models.BooleanField(default=False)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='soil_reports', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CropRecommendationRecord',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('nitrogen', models.FloatField()),
                ('phosphorus', models.FloatField()),
                ('potassium', models.FloatField()),
                ('temperature', models.FloatField()),
                ('humidity', models.FloatField()),
                ('ph', models.FloatField()),
                ('rainfall', models.FloatField()),
                ('recommended_crop', models.CharField(max_length=100)),
                ('confidence', models.DecimalField(decimal_places=4, max_digits=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(1)])),
                ('alternatives', models.JSONField(default=list)),
                ('soil_analysis', models.JSONField(default=dict)),
                ('agronomic_advisory', models.JSONField(default=dict)),
                ('from_soil_report', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ai.soilreport')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='crop_recommendations', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='cropscan',
            name='image_object_key',
        ),
        migrations.RemoveField(
            model_name='cropscan',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='cropscan',
            name='model_version',
        ),
        migrations.RemoveField(
            model_name='cropscan',
            name='prediction_json',
        ),
        migrations.AddField(
            model_name='cropscan',
            name='crop_name',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cropscan',
            name='diagnosed_disease',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cropscan',
            name='diagnostic_source',
            field=models.CharField(default='image_scan', max_length=50),
        ),
        migrations.AddField(
            model_name='cropscan',
            name='image_url',
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AddField(
            model_name='cropscan',
            name='pathogen_type',
            field=models.CharField(default='', max_length=80),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cropscan',
            name='severity',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cropscan',
            name='treatment_plan',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='cropscan',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='cropscan',
            name='created_at',
            field=models.DateTimeField(db_index=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='cropscan',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='crop_scans', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddIndex(
            model_name='soilreport',
            index=models.Index(fields=['user', '-created_at'], name='ai_soilrepo_user_id_0f0d2c_idx'),
        ),
        migrations.AddIndex(
            model_name='croprecommendationrecord',
            index=models.Index(fields=['user', '-created_at'], name='ai_cropreco_user_id_44faea_idx'),
        ),
    ]

